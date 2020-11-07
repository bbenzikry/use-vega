import { View } from 'vega';
import { MutableRefObject } from 'react';
import { GrammerType } from '../enums/GrammerType';
export declare type ViewOptions = ConstructorParameters<typeof View>[1];
export declare const updateVegaView: (viewReference: MutableRefObject<HTMLDivElement | null>, vlSpec?: import("vega-lite/build/src/spec/unit").TopLevelUnitSpec | import("vega-lite/build/src/spec").TopLevelFacetSpec | import("vega-lite/build/src/spec").TopLevel<import("vega-lite/build/src/spec").LayerSpec> | (import("vega-lite/build/src/spec/repeat").NonLayerRepeatSpec & import("vega-lite/build/src/spec/toplevel").TopLevelProperties<import("vega-lite/build/src/expr").ExprRef | import("vega").SignalRef> & {
    $schema?: string | undefined;
    config?: import("vega-lite").Config<import("vega-lite/build/src/expr").ExprRef | import("vega").SignalRef> | undefined;
    datasets?: Record<string, import("vega-lite/build/src/data").InlineDataset> | undefined;
    usermeta?: Record<string, unknown> | undefined;
}) | (import("vega-lite/build/src/spec/repeat").LayerRepeatSpec & import("vega-lite/build/src/spec/toplevel").TopLevelProperties<import("vega-lite/build/src/expr").ExprRef | import("vega").SignalRef> & {
    $schema?: string | undefined;
    config?: import("vega-lite").Config<import("vega-lite/build/src/expr").ExprRef | import("vega").SignalRef> | undefined;
    datasets?: Record<string, import("vega-lite/build/src/data").InlineDataset> | undefined;
    usermeta?: Record<string, unknown> | undefined;
}) | import("vega-lite/build/src/spec").TopLevel<import("vega-lite/build/src/spec/concat").GenericConcatSpec<import("vega-lite/build/src/spec").GenericSpec<import("vega-lite/build/src/spec").FacetedUnitSpec, import("vega-lite/build/src/spec").LayerSpec, import("vega-lite/build/src/spec").RepeatSpec, import("vega-lite/build/src/channeldef").Field>>> | import("vega-lite/build/src/spec").TopLevel<import("vega-lite/build/src/spec").GenericVConcatSpec<import("vega-lite/build/src/spec").GenericSpec<import("vega-lite/build/src/spec").FacetedUnitSpec, import("vega-lite/build/src/spec").LayerSpec, import("vega-lite/build/src/spec").RepeatSpec, import("vega-lite/build/src/channeldef").Field>>> | import("vega-lite/build/src/spec").TopLevel<import("vega-lite/build/src/spec").GenericHConcatSpec<import("vega-lite/build/src/spec").GenericSpec<import("vega-lite/build/src/spec").FacetedUnitSpec, import("vega-lite/build/src/spec").LayerSpec, import("vega-lite/build/src/spec").RepeatSpec, import("vega-lite/build/src/channeldef").Field>>> | undefined, overrideOptions?: ViewOptions, grammer?: GrammerType) => View | undefined;
