import React from 'react';
import styled from 'styled-components';
import { Button } from '@components/General';
import { CaretRightOutlined } from '@ant-design/icons';

const SButton = styled(Button)`
    height: var(--height-extra-small-button);
    background: var(--color-accent);
    font-size: var(--font-size-extra-small);
    letter-spacing: -0.24px;
    padding: 0;
    margin-right: 0;
    border: none;
    color: var(--color-text);
    &:focus,
    &:active {
        border: none;
    }
`;

const RightArrow = styled(CaretRightOutlined)`
    vertical-align: 0;
    font-size: 14px;
    margin-left: 0.5rem;
`;

type ISProps = {
    isAdjust: boolean;
    setAdjust: React.Dispatch<React.SetStateAction<boolean>>;
    account: string;
    className?: string;
};

export default styled(({ className, isAdjust, setAdjust }: ISProps) => {
    return (
        <div className={className}>
            <p className="flex items-center whitespace-nowrap mr-2">{isAdjust ? 'Adjust Position' : 'Place Order'}</p>
            {isAdjust ? (
                <SButton onClick={() => setAdjust(false)}>
                    Switch to Place
                    <RightArrow />
                </SButton>
            ) : (
                <SButton onClick={() => setAdjust(true)}>
                    Switch to Adjust
                    <RightArrow />
                </SButton>
            )}
        </div>
    );
})`
    font-size: var(--font-size-medium);
    letter-spacing: -0.4px;
    color: var(--color-text);
    display: ${(props) => (props.account === '' ? 'none' : 'flex')};
    justify-content: space-between;
    background-color: #00125d;
    height: var(--height-small-container);
    border-bottom: 1px solid #0c3586;
    padding: 0 12px;
    z-index: 1;
` as React.FC<ISProps>;
