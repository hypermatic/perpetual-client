import React, { useContext, useCallback, useReducer, useMemo } from 'react';
import styled from 'styled-components';
import { NumberSelect, Section } from '@components/General';
import { UserBalance } from 'types';
import ErrorComponent from '@components/General/Error';
import TracerModal from '@components/Modals';
import { SlideSelect } from '@components/Buttons';
import { Option } from '@components/Buttons/SlideSelect';
import { After, Button, HiddenExpand, Previous } from '@components/General';
import { TracerContext } from 'context';
import { BigNumber } from 'bignumber.js';
import {
    calcTotalMargin,
    calcMinimumMargin,
    calcBuyingPower,
    calcAvailableMarginPercent,
} from '@tracer-protocol/tracer-utils';
import { toApproxCurrency } from '@libs/utils';
import { defaults } from '@libs/Tracer';

const SNumberSelect = styled(NumberSelect)`
    margin-top: 1rem;
    .balance {
        color: #005ea4;
    }
    > .balance > .max {
        margin-left: 1rem;
    }
`;

const SHiddenExpand = styled(HiddenExpand)`
    margin-left: 0;
    background: #002886;
    margin-top: 1rem;
    margin-bottom: 1rem;
`;

const MButton = styled(Button)`
    width: 80%;
    margin: auto;
    height: 40px;
    border: 1px solid #ffffff;
    color: #fff;
`;

const Balance = styled.div<{
    display: boolean;
}>`
    color: #3da8f5;
    font-size: 1rem;
    letter-spacing: -0.32px;
    transition: 0.3s;
    opacity: ${(props) => (props.display ? 1 : 0)};
`;

const SAfter = styled(After)`
    &.invalid {
        color: #f15025;
    }
`;

const SSlideSelect = styled(SlideSelect)`
    max-width: 250px;
    margin-left: 0;
    margin-top: 1rem;
    margin-bottom: 1rem;
`;

const ApproveButton = styled(Button)`
    width: 80%;
    margin: 1rem auto;
    height: 40px;
    border: 1px solid #ffffff;
    color: #fff;
`;

type AMProps = {
    className?: string;
    close: () => any;
    isDeposit: boolean;
    setDeposit: React.Dispatch<React.SetStateAction<boolean>>;
    display: boolean;
    unit: string;
    balances: UserBalance;
    price: BigNumber;
    maxLeverage: BigNumber;
};

type ModalState = {
    amount: number;
    loading: boolean;
    title: string;
    subTitle: string;
};
type ModalAction =
    | { type: 'setAmount'; amount: number }
    | { type: 'setTitles'; title: string; subTitle: string }
    | { type: 'setLoading'; loading: boolean };

const initialState: ModalState = {
    amount: NaN,
    loading: false,
    title: 'Deposit Margin',
    subTitle: '',
};

const reducer = (state: ModalState, action: ModalAction) => {
    switch (action.type) {
        case 'setAmount': {
            return {
                ...state,
                amount: action.amount,
            };
        }
        case 'setTitles': {
            return {
                ...state,
                title: action.title,
                subTitle: action.subTitle,
            };
        }
        case 'setLoading': {
            return {
                ...state,
                loading: action.loading,
            };
        }
        default:
            throw new Error('Unexpected action');
    }
};

export default styled(
    ({ className, close, isDeposit, unit, balances, price, maxLeverage, display, setDeposit }: AMProps) => {
        const {
            deposit = () => console.error('Deposit is not defined'),
            withdraw = () => console.error('Withdraw is not defined'),
            approve = () => console.error('Approve is not defined'),
            selectedTracer,
        } = useContext(TracerContext);
        const [state, dispatch] = useReducer(reducer, initialState);

        const available = isDeposit
            ? balances.tokenBalance
            : calcTotalMargin(balances.quote, balances.base, price).minus(
                  calcMinimumMargin(balances.quote, balances.base, price, maxLeverage),
              );
        const newBalance = isDeposit ? balances.quote.plus(state.amount) : balances.quote.minus(state.amount);

        const checkErrors = useCallback(() => {
            if (state.amount > available.toNumber()) {
                return 'INSUFFICIENT_FUNDS';
            } else if (
                (state.amount < calcMinimumMargin(balances.quote, balances.base, price, maxLeverage).toNumber() ||
                    // TODO remove 160 for dynamic calculation of liquidation gas cost
                    state.amount < 150 - calcTotalMargin(balances.quote, balances.base, price).toNumber()) &&
                isDeposit
            ) {
                return 'DEPOSIT_MORE';
            } else if (
                calcTotalMargin(newBalance, balances.base, price).lt(
                    calcMinimumMargin(newBalance, balances.base, price, maxLeverage ?? defaults.maxLeverage),
                )
            ) {
                return 'WITHDRAW_INVALID';
            }
            return 'NO_ERROR';
        }, [state.amount]);

        const handleClose = () => {
            dispatch({ type: 'setAmount', amount: NaN });
            dispatch({ type: 'setLoading', loading: false });
            close();
        };

        useMemo(() => {
            if (isDeposit) {
                dispatch({ type: 'setTitles', title: 'Deposit Margin', subTitle: '' });
            } else {
                dispatch({ type: 'setTitles', title: 'Withdraw Margin', subTitle: '' });
            }
        }, [isDeposit]);
        return (
            <TracerModal
                loading={state.loading}
                className={className}
                show={display}
                title={state.title}
                subTitle={state.subTitle}
                onClose={() => handleClose()}
            >
                <SSlideSelect value={isDeposit ? 0 : 1} onClick={(val) => setDeposit(val === 0)}>
                    <Option>Deposit</Option>
                    <Option>Withdraw</Option>
                </SSlideSelect>
                <SNumberSelect
                    unit={unit}
                    title={'Amount'}
                    amount={state.amount}
                    balance={available.toNumber()}
                    setAmount={(amount: number) => dispatch({ type: 'setAmount', amount: amount })}
                />
                <Balance display={!!state.amount}>
                    <span className="mr-3">Balance</span>
                    <SAfter className={checkErrors() !== 'NO_ERROR' ? 'invalid' : ''}>
                        {toApproxCurrency(newBalance)}
                    </SAfter>
                </Balance>
                <SHiddenExpand defaultHeight={0} open={!!state.amount}>
                    <p className="mb-3">{isDeposit ? 'Deposit' : 'Withdraw'} Summary</p>
                    <Section label={`Total Margin`}>
                        <Previous>{`${toApproxCurrency(
                            calcTotalMargin(balances.quote, balances.base, price),
                        )}`}</Previous>
                        {`${toApproxCurrency(calcTotalMargin(newBalance, balances.base, price))}`}
                    </Section>
                    <Section label={`Buying Power`}>
                        <Previous>{`${toApproxCurrency(
                            calcBuyingPower(balances.quote, balances.base, price, maxLeverage),
                        )}`}</Previous>
                        {`${toApproxCurrency(calcBuyingPower(newBalance, balances.base, price, maxLeverage))}`}
                    </Section>
                    <Section label={`Available Margin`}>
                        <Previous>{`${calcAvailableMarginPercent(
                            balances.quote,
                            balances.base,
                            price,
                            maxLeverage,
                        ).toPrecision(3)}%`}</Previous>
                        {`${calcAvailableMarginPercent(newBalance, balances.base, price, maxLeverage).toPrecision(3)}%`}
                    </Section>
                </SHiddenExpand>
                <div className="text-center">
                    {isDeposit && !selectedTracer?.getTracerApproved() ? (
                        <ApproveButton
                            disabled={selectedTracer?.getTracerApproved()}
                            onClick={() => {
                                dispatch({ type: 'setLoading', loading: true });
                                dispatch({
                                    type: 'setTitles',
                                    title: 'Waiting for Confirmation',
                                    subTitle: 'Confirm the transaction in your wallet to unlock USD',
                                });
                                approve(selectedTracer?.address ?? '', {
                                    afterConfirmation: () => {
                                        dispatch({ type: 'setLoading', loading: false });
                                    },
                                });
                            }}
                        >
                            Approve USD
                        </ApproveButton>
                    ) : null}
                    <MButton
                        disabled={!selectedTracer?.getTracerApproved() || checkErrors() !== 'NO_ERROR'}
                        onClick={() => {
                            dispatch({ type: 'setLoading', loading: true });
                            dispatch({
                                type: 'setTitles',
                                title: 'Waiting for Confirmation',
                                subTitle: `Confirm the transaction in your wallet to ${
                                    isDeposit ? 'deposit' : 'withdraw'
                                } USD`,
                            });
                            isDeposit ? deposit(state.amount, handleClose) : withdraw(state.amount, handleClose);
                        }}
                    >
                        {isDeposit ? 'Deposit' : 'Withdraw'}
                    </MButton>
                </div>
                <ErrorComponent context="margin" error={checkErrors()} />
            </TracerModal>
        );
    },
)`
    max-width: 434px !important;
` as React.FC<AMProps>;