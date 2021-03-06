import React from 'react';
import { toApproxCurrency } from '@libs/utils';
import { calcLiquidationPrice } from '@tracer-protocol/tracer-utils';
import { HiddenExpand, Previous, Section } from '@components/General';
import { UserBalance } from 'types';
import { BigNumber } from 'bignumber.js';
import styled from 'styled-components';
import { OrderState } from '@context/OrderContext';

const SHiddenExpand = styled(HiddenExpand)`
    margin: 10px;
    background: var(--color-accent);
    border-radius: 10px;
`;
interface MTDProps {
    balances: UserBalance;
    order: OrderState;
    fairPrice: BigNumber;
    maxLeverage: BigNumber;
    className?: string;
}
export const MarketTradeDetails: React.FC<MTDProps> = ({
    balances,
    order,
    fairPrice,
    maxLeverage,
    className,
}: MTDProps) => {
    const { nextPosition, exposureBN, slippage, marketTradePrice } = order;
    return (
        <SHiddenExpand open={!!exposureBN.toNumber()} defaultHeight={0} className={className}>
            <Section label={'Liquidation price'}>
                <Previous>
                    {toApproxCurrency(calcLiquidationPrice(balances.quote, balances.base, fairPrice, maxLeverage))}
                </Previous>
                {toApproxCurrency(calcLiquidationPrice(nextPosition.quote, nextPosition.base, fairPrice, maxLeverage))}
            </Section>
            <Section label={'Slippage and fees'}>{slippage.toFixed(2)}%</Section>
            <Section label={'Expected price'}>{toApproxCurrency(marketTradePrice)}</Section>
        </SHiddenExpand>
    );
};

interface LTDProps {
    balances: UserBalance;
    nextPosition: {
        quote: BigNumber;
        base: BigNumber;
    };
    exposure: BigNumber;
    fairPrice: BigNumber;
    maxLeverage: BigNumber;
    orderPrice: number;
    className?: string;
}
export const LimitTradeDetails: React.FC<LTDProps> = ({
    balances,
    nextPosition,
    exposure,
    fairPrice,
    maxLeverage,
    orderPrice,
    className,
}: LTDProps) => {
    return (
        <SHiddenExpand open={!!exposure.toNumber()} defaultHeight={0} className={className}>
            <Section label={'Liquidation price'}>
                <Previous>
                    {toApproxCurrency(calcLiquidationPrice(balances.quote, balances.base, fairPrice, maxLeverage))}
                </Previous>
                {toApproxCurrency(
                    calcLiquidationPrice(nextPosition.quote, nextPosition.base, new BigNumber(orderPrice), maxLeverage),
                )}
            </Section>
            <Section label={'Expected price'}>{toApproxCurrency(orderPrice)}</Section>
        </SHiddenExpand>
    );
};

interface ASProps {
    balances: UserBalance;
    nextPosition: {
        quote: BigNumber;
        base: BigNumber;
    };
    exposure: BigNumber;
    fairPrice: BigNumber;
    maxLeverage: BigNumber;
    baseTicker: string;
    className?: string;
}
export const AdjustSummary: React.FC<ASProps> = ({
    balances,
    nextPosition,
    exposure,
    fairPrice,
    maxLeverage,
    baseTicker,
    className,
}: ASProps) => {
    return (
        <SHiddenExpand open={!!exposure.toNumber()} defaultHeight={0} className={className}>
            <Section label={'Exposure'}>{`${exposure.toFixed(2)} ${baseTicker}`}</Section>
            <Section label={'Liquidation price'}>
                <Previous>
                    {toApproxCurrency(calcLiquidationPrice(balances.quote, balances.base, fairPrice, maxLeverage))}
                </Previous>
                {toApproxCurrency(calcLiquidationPrice(nextPosition.quote, nextPosition.base, fairPrice, maxLeverage))}
            </Section>
            <Section label={'Expected price'}>{toApproxCurrency(fairPrice)}</Section>
        </SHiddenExpand>
    );
};
