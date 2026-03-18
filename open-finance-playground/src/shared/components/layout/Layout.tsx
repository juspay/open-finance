"use client";
import React, { ReactNode } from "react";
import style from "./Layout.module.css";

type LayoutProps = {
    header: ReactNode;
    content: ReactNode;
    footer: ReactNode;
    clickToPay? : boolean;
    styles? : React.CSSProperties;
    currentState? : number;
};

const Layout: React.FC<LayoutProps> = ({ header, content, footer,clickToPay, styles, currentState }) => {
    
    return (
        <div className={style.container} style = {styles? styles:undefined} key={currentState}>
            <header className={style.header}>{header}</header>
            <main className={clickToPay ? style.clickToPayContent : style.content} style={{...(styles ? styles : {}),...(currentState ? { overflowX: "hidden" } : {})}}>{content}</main>
            <footer
            className={style.footer}
            style={styles ? { borderRadius: styles.borderRadius } : undefined}
            >
            {footer}
            </footer>
        </div>
    );
};

export default Layout;