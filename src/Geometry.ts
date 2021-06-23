/// <reference path="CommonTypes.ts" />

namespace Cgx {

    export interface Geometry {}

    export interface ArcGeometry extends Geometry {
        centerPoint: Point;
        radius: number;
        startAngle: number;
        endAngle: number;
        isAntiClockwise: boolean;
    }

    export interface LineGeometry extends Geometry {
        startPoint: Point;
        endPoint: Point;
    }

    export interface RectangleGeometry extends Geometry {
        origin: Point;
        width: number;
        height: number;
        cornerRadius: CornersRadiusDefinition;
    }

    export interface EllipseGeometry extends Geometry {
        centerPoint: Point;
        radiusX: number;
        radiusY: number;
    }

    export interface PolygonalGeometry extends Geometry {
        points: Point[];
        isClosed: boolean;
    }

    export interface QuadraticCurveGeometry extends PolygonalGeometry {
        controlPoints: Point[];
    }

    export interface CubicCurveGeometry extends PolygonalGeometry {
        controlPoints1: Point[];
        controlPoints2: Point[];
    }

    export interface ImageGeometry extends RectangleGeometry {
        image: CanvasImageSource;
    }

    export interface TextGeometry extends Geometry {
        text: string;
        origin: Point;
    }

    export interface PathGeometry extends Geometry {
        path: Path2D;
        origin: Point;
        fillRule?: CanvasFillRule;
    }

    export interface DonutGeometry extends Geometry {
        centerPoint: Point;
        startRadius: number;
        endRadius: number;
        startAngle: number;
        endAngle: number;
        isAntiClockwise?: boolean;
    }
}