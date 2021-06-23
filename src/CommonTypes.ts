
namespace Cgx {

    export interface Point { x: number, y: number };

    export type BrushDefinition = number | string | number[] | GradientBrush | PatternBrush;

    export type CornersRadiusObject = { topLeft: number, topRight: number, bottomLeft: number, bottomRight: number };

    export type CornersRadiusDefinition = number | number[] | CornersRadiusObject;

    export interface Shadow {
        blur: number;
        offsetX: number;
        offsetY: number;
        color: string;
    }
}