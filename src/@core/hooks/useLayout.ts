import {useContext} from 'react'
import {LayoutContextValue} from 'src/@core/context/types'
import {LayoutContext} from "src/@core/context/LayoutContext";

export const useLayout = (): LayoutContextValue => useContext(LayoutContext)
