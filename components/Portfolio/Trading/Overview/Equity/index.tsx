import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { LargeButton, SmallTitle } from '@components/Portfolio';
import {
    EqTableRow,
    EqTableCell,
    EqTableCellLarge,
    EqTableCellLargeEmpty,
    EqTableCellEmpty,
    EqTable,
    EqTableBody,
    EqTableCellLast,
    Profit,
    ProfitArrow,
    ProfitAmount,
    Amount,
    Text,
    CellTitle,
    CellDesc,
} from './EqTable';

interface EqProps {
    className?: string;
    selectedTracerAddress: string;
}
const Equity: FC<EqProps> = styled(({ className }: EqProps) => {
    const [show, setShow] = useState(false);
    const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setShow(!show);
    };

    return (
        <div className={className}>
            <div className="flex justify-content-between">
                <SmallTitle>Equity</SmallTitle>
                <LargeButton onClick={(e) => onClick(e)}>
                    {show ? 'Hide Breakdown' : 'Show Breakdown'}
                </LargeButton>
            </div>
            <EqTable>
                <EqTableBody>
                    {/* First row */}
                    <EqTableRow>
                        <EqTableCellLarge>
                            <Amount color="#21DD53">
                                $44.3
                                <ProfitArrow direction="up" />
                            </Amount>
                            <Profit>
                                <ProfitAmount color="#21DD53">$130 (23%)</ProfitAmount>
                                <Text>All time</Text>
                            </Profit>
                            <Text>
                                <CellTitle>Equity</CellTitle>
                                <CellDesc>Over 4 open positions</CellDesc>
                            </Text>
                        </EqTableCellLarge>
                        <EqTableCell>
                            <Amount>$0.45</Amount>
                            <Text>
                                <CellTitle>Deposited Margin</CellTitle>
                            </Text>
                        </EqTableCell>
                        <EqTableCell>
                            <Amount>$0.45</Amount>
                            <Text>
                                <CellTitle>Unrealised PnL</CellTitle>
                            </Text>
                        </EqTableCell>
                        <EqTableCellLast>
                            <Amount>$0.45</Amount>
                            <Text>
                                <CellTitle>Realised PnL</CellTitle>
                            </Text>
                        </EqTableCellLast>
                    </EqTableRow>
                    {/* Second row */}
                    <EqTableRow>
                        <EqTableCellLargeEmpty />
                        <EqTableCellEmpty />
                        <EqTableCell>
                            <Amount small>$0.45</Amount>
                            <Text>
                                <CellTitle>Price Changes</CellTitle>
                            </Text>
                        </EqTableCell>
                        <EqTableCellLast>
                            <Amount small>$0.45</Amount>
                            <Text>
                                <CellTitle>Price Changes</CellTitle>
                            </Text>
                        </EqTableCellLast>
                    </EqTableRow>
                    {/* Third row */}
                    <EqTableRow>
                        <EqTableCellLargeEmpty />
                        <EqTableCellEmpty />
                        <EqTableCell>
                            <Amount small>$0.45</Amount>
                            <Text>
                                <CellTitle>Funding Rate</CellTitle>
                            </Text>
                        </EqTableCell>
                        <EqTableCellLast>
                            <Amount small>$0.45</Amount>
                            <Text>
                                <CellTitle>Funding Rate</CellTitle>
                            </Text>
                        </EqTableCellLast>
                    </EqTableRow>
                    {/* Fourth row */}
                    <EqTableRow>
                        <EqTableCellLargeEmpty />
                        <EqTableCellEmpty />
                        <EqTableCellEmpty border />
                        <EqTableCellLast>
                            <Amount small>$0.45</Amount>
                            <Text>
                                <CellTitle>Trading Fee</CellTitle>
                            </Text>
                        </EqTableCellLast>
                    </EqTableRow>
                    {/* Fifth row */}
                    <EqTableRow>
                        <EqTableCellLargeEmpty />
                        <EqTableCellEmpty />
                        <EqTableCellEmpty border />
                        <EqTableCellLast>
                            <Amount small>$0.45</Amount>
                            <Text>
                                <CellTitle>Insurance Funding Rate</CellTitle>
                            </Text>
                        </EqTableCellLast>
                    </EqTableRow>
                </EqTableBody>
            </EqTable>
        </div>
    );
})`
    width: 100%;
    height: fit-content;
    overflow: hidden;
    border-radius: 7px;
    padding: 8px 8px 0px;
    position: relative;
    background: #002886;
`;

export default Equity;
