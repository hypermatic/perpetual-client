import React, { useContext, useState } from 'react';
import { Tracer } from 'libs';
import { toApproxCurrency } from '@libs/utils';
import styled from 'styled-components';
import {
    calcTotalMargin,
    calcBuyingPower,
    calcMinimumMargin,
    calcAvailableMarginPercent,
} from '@tracer-protocol/tracer-utils';
import { Box, Button, Previous } from '@components/General';
import { Web3Context } from 'context';
import { BigNumber } from 'bignumber.js';
import { defaults } from '@libs/Tracer';
import AccountModal from './AccountModal';
import { OrderState } from '@context/OrderContext';
import { AvailableMarginTip, BuyingPowerTip, TotalMarginTip } from '@components/Tooltips';
// import CalculatorModal from './Calculator';

const SBox = styled(Box)`
    background: #011772;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 250px;
    z-index: 4;

    > p {
        font-size: 20px;
        letter-spacing: 0;
        color: #fff;
    }
`;

const Connect = styled(Button)`
    width: 100% !important;
    padding: 0.5rem !important;
    margin-top: 0.5rem;
`;

const WalletConnect: React.FC = () => {
    const { handleConnect } = useContext(Web3Context);
    return (
        <SBox>
            <p>Connect your wallet to get started with Tracer</p>
            <Connect
                className="primary"
                onClick={() => (handleConnect ? handleConnect() : console.error('Connect button is undefined'))}
            >
                Connect Wallet
            </Connect>
        </SBox>
    );
};

const Item = styled.div`
    width: 100%;
    font-size: 16px;
    margin-bottom: 10px;

    > span {
        width: 100%;
        display: flex;
        font-size: 16px;
        letter-spacing: -0.32px;
    }

    > span a:nth-child(2) {
        margin-left: auto;
        color: #21dd53;
    }

    > h3 {
        letter-spacing: -0.32px;
        color: #3da8f5;
        text-transform: capitalize;
        margin-bottom: 5px;
    }
`;

const DepositButtons = styled.div`
    margin-top: auto;
    display: flex;
    justify-content: space-between;
`;

const AccountInfo = styled(Box)<{ zeroBalance: boolean }>`
    position: relative;
    flex-direction: column;
    background-color: ${(props) => (props.zeroBalance ? '#00125D' : 'inherit')};
`;

const Title = styled.h2`
    font-size: 20px;
    letter-spacing: -0.4px;
    color: #fff;
    margin-bottom: 0.5rem;
`;

const SButton = styled(Button)`
    height: 28px;
    line-height: 28px;
    padding: 0;
    margin: 0;
`;

const SubText = styled.span`
    letter-spacing: -0.32px;
    color: #005ea4;
    font-size: 16px;
    display: inline !important;
`;

const AccountPanel: React.FC<{
    selectedTracer: Tracer | undefined;
    account: string;
    order: OrderState | undefined;
}> = ({ selectedTracer, account, order }) => {
    const [popup, setPopup] = useState(false);
    const [deposit, setDeposit] = useState(false);
    // const [calculator, showCalculator] = useState(false);
    const balances = selectedTracer?.getBalance() ?? defaults.balances;
    const price = selectedTracer?.getOraclePrice() ?? defaults.oraclePrice;
    const maxLeverage = selectedTracer?.getMaxLeverage() ?? new BigNumber(1);
    const newBase = order?.nextPosition.base ?? balances.base;
    const newQuote = order?.nextPosition.quote ?? balances.quote;

    const handleClick = (popup: boolean, deposit: boolean) => {
        setPopup(popup);
        setDeposit(deposit);
    };

    return account === '' ? (
        <WalletConnect />
    ) : (
        <AccountInfo zeroBalance={balances.quote.eq(0)}>
            <Title>Margin Account</Title>
            {/*<SButton className="ml-auto mr-1" onClick={() => showCalculator(true)}>*/}
            {/*    Calculator*/}
            {/*</SButton>*/}
            <Item>
                <h3>
                    <TotalMarginTip baseTicker={selectedTracer?.baseTicker ?? ''}>Total Margin</TotalMarginTip>
                </h3>
                <span>{toApproxCurrency(calcTotalMargin(balances.quote, balances.base, price))}</span>
            </Item>
            <Item>
                <h3>
                    <BuyingPowerTip
                        baseTicker={selectedTracer?.baseTicker ?? ''}
                        availableMargin={
                            calcTotalMargin(balances.quote, balances.base, price).toNumber() -
                            calcMinimumMargin(balances.quote, balances.base, price, maxLeverage).toNumber()
                        }
                        maxLeverage={maxLeverage.toNumber()}
                    >
                        Buying Power
                    </BuyingPowerTip>
                    <SubText>{` @${maxLeverage.toNumber()}X Maximum Leverage`}</SubText>
                </h3>
                <span>
                    {!order?.exposure || !order.price ? (
                        toApproxCurrency(calcBuyingPower(balances.quote, balances.base, price, maxLeverage))
                    ) : (
                        <>
                            <Previous>
                                {toApproxCurrency(calcBuyingPower(balances.quote, balances.base, price, maxLeverage))}
                            </Previous>
                            {toApproxCurrency(
                                calcBuyingPower(balances.quote, balances.base, price, maxLeverage).minus(
                                    new BigNumber(order.exposure * order.price),
                                ),
                            )}
                        </>
                    )}
                </span>
            </Item>
            <Item>
                <h3>
                    <AvailableMarginTip>Available Margin</AvailableMarginTip>
                </h3>
                <span>
                    {!order?.exposure || !order.price ? (
                        `${calcAvailableMarginPercent(balances.quote, balances.base, price, maxLeverage).toPrecision(
                            3,
                        )}%`
                    ) : (
                        <>
                            <Previous>
                                {`${calcAvailableMarginPercent(
                                    balances.quote,
                                    balances.base,
                                    price,
                                    maxLeverage,
                                ).toPrecision(3)}%`}
                            </Previous>
                            {`${calcAvailableMarginPercent(newQuote, newBase, price, maxLeverage).toPrecision(3)}%`}
                        </>
                    )}
                </span>
            </Item>
            <DepositButtons>
                <SButton
                    className={balances.quote.eq(0) ? 'primary' : ''}
                    onClick={(_e: any) => handleClick(true, true)}
                >
                    Deposit
                </SButton>
                <SButton onClick={(_e: any) => handleClick(true, false)}>Withdraw</SButton>
            </DepositButtons>
            <AccountModal
                display={popup}
                close={() => setPopup(false)}
                isDeposit={deposit}
                setDeposit={setDeposit}
                unit={selectedTracer?.marketId?.split('/')[1] ?? 'NO_ID'}
                balances={balances}
                maxLeverage={maxLeverage}
                price={price}
            />
            {/*<CalculatorModal*/}
            {/*    display={calculator}*/}
            {/*    close={() => showCalculator(false)}*/}
            {/*    exposureUnit={selectedTracer?.marketId?.split('/')[0] ?? 'NO_ID'}*/}
            {/*    marginUnit={selectedTracer?.marketId?.split('/')[1] ?? 'NO_ID'}*/}
            {/*    balances={balances}*/}
            {/*    price={Number.isNaN(price) ? 0 : price}*/}
            {/*/>*/}
        </AccountInfo>
    );
};

export default AccountPanel;