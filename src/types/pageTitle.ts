import { ReactElement } from "react";

export interface PageTitleType {
    title:string,
    subtitle?:string,
    content?:ReactElement | string,
    button?:ReactElement,
    imgSource?:string,
    noarrow?:boolean
}