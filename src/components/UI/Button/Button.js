import React from 'react';
import "./Button.css";
import middleActive from "./middleBtnActive.png";
import middleDisabled from "./middleBtnDisabled.png";
import leftArrDecor from "./leftArrDecor.png";
import leftArr from "./leftArr.png";
import leftArrDecorDisabled from "./leftArrDecorDisabled.png";
import leftArrDisabled from "./leftArrDisabled.png";
import middleRightDecor from "./middleRightDecor.png"
import middleRightDecorDisabled from "./middleRightDecorDisabled.png"
import middleLongDecor from "./middleLongDecorButton.png"

export const Button = ({onClick, buttonType, active, selected, children, style}) => {
    let bgBtn = middleActive;
    let st = style;
    switch (buttonType) {
        case 'middleBtn':
            active ? bgBtn = middleActive : bgBtn = middleDisabled;
            st.backgroundImage = `url(${bgBtn})`
            st.width = "230px"
            break;
        case 'leftArrDecor':
            active ? bgBtn = leftArrDecor : bgBtn = leftArrDecorDisabled;
            st.backgroundImage = `url(${bgBtn})`
            st.width = "273px"
            break;
        case 'leftArr':
            active ? bgBtn = leftArr : bgBtn = leftArrDisabled;
            st.backgroundImage = `url(${bgBtn})`
            st.width = "248px"
            break;
        case 'middleRightDecor':
            active ? bgBtn = middleRightDecor : bgBtn = middleRightDecorDisabled;
            st.backgroundImage = `url(${bgBtn})`
            st.width = "231px"
            break;
        case 'middleLongDecor':                                        //FIXME: some kind problem
            active ? bgBtn = middleLongDecor : bgBtn = middleLongDecor;
            st.backgroundImage=`url(${bgBtn})`
            st.width = "241px"
            break;
        default:
            active ? bgBtn = middleActive : bgBtn = middleDisabled;
            break;
    }

    return (
        <>
            <button className={active ? "rootBtn activeBtn" : "rootBtn"} style={st} onClick={() =>
            {
                if (active) {
                    if (onClick) onClick()
                } else {

                }
            }
            }>{children}</button>
        </>
    );
};