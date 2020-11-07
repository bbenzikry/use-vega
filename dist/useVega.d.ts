/// <reference types="react" />
import { TopLevelSpec } from 'vega-lite';
import { Spec, View } from 'vega';
import { ViewOptions } from './helpers/view';
import { GrammerType } from './enums/GrammerType';
export interface UseVegaOptions {
    overrides?: ViewOptions;
    grammer?: GrammerType;
}
export declare const useVega: (initialSpec: TopLevelSpec | Spec, opts?: UseVegaOptions | undefined) => {
    ref: import("react").MutableRefObject<HTMLDivElement | null>;
    view: import("react").MutableRefObject<View | null | undefined>;
    updateView: (spec: any) => void;
    isLoading: boolean;
    noData: boolean;
    error: null;
    updateContainer: (elementRef: HTMLDivElement) => void;
};
