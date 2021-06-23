
namespace Cgx {

    export namespace Shapes {

        interface StrokeShape {
            strokeBrush: BrushDefinition;
            strokeWidth: number;
        }
        interface FillShape {
            fillBrush: BrushDefinition;
        }

        const isFillShape = (type: any): type is FillShape => 
            (type as FillShape).fillBrush !== undefined;

        const isStrokeShape = (type: any): type is StrokeShape => 
            (type as StrokeShape).strokeBrush !== undefined &&
            (type as StrokeShape).strokeWidth !== undefined;

        

        export abstract class Shape {

            public shadow?: Shadow = null;
            public transform?: Transform = null;

            protected abstract onRender(gfx: CoreGraphics): void;

            public render(gfx: CoreGraphics) {

                const currentFill = gfx.fillBrush;
                let hasFill = false;
                if (isFillShape(this) && this.fillBrush) {
                    hasFill = true;
                    gfx.fillBrush = this.fillBrush;
                }

                const currentStroke = gfx.strokeBrush;
                const currentStrokeWidth = gfx.strokeWidth;
                let hasStroke = false;
                let hasStrokeWidth = false;
                if (isStrokeShape(this)) {
                    if (this.strokeBrush) {
                        gfx.strokeBrush = this.strokeBrush;
                        hasStroke = true;
                    }
                    if (this.strokeWidth !== undefined) {
                        gfx.strokeWidth = this.strokeWidth;
                        hasStrokeWidth = true;
                    }
                }

                const currentShadow = gfx.shadow;
                if (this.shadow) {
                    gfx.shadow = this.shadow;
                }

                this.onRender(gfx);

                if (this.shadow) {
                    gfx.shadow = currentShadow;
                }
                if (hasFill) {
                    gfx.fillBrush = currentFill;
                }
                if (hasStroke) {
                    gfx.strokeBrush = currentStroke;
                }
                if (hasStrokeWidth) {
                    gfx.strokeWidth = currentStrokeWidth;
                }
            }
        }


        export class Arc extends Shape implements StrokeShape {

            public static fromGeometry(geometry: ArcGeometry, strokeBrush?: BrushDefinition, strokeWidth?: number) {
                const result = new Arc();
                result.centerPoint = geometry.centerPoint;
                result.radius = geometry.radius;
                result.startAngle = geometry.startAngle;
                result.endAngle = geometry.endAngle;
                result.isAntiClockwise = geometry.isAntiClockwise;

                if (strokeWidth !== undefined) {
                    result.strokeWidth = strokeWidth;
                }

                if (strokeBrush !== undefined) {
                    result.strokeBrush = strokeBrush;
                }

                return result;
            }

            public strokeBrush: BrushDefinition;
            public strokeWidth: number;

            public centerPoint: Point = createPoint();
            public radius: number = 0;
            public startAngle: number = 0;
            public endAngle: number = 0;
            public isAntiClockwise: boolean;

            protected onRender(gfx: CoreGraphics): void {
                gfx.drawArc(
                    this.centerPoint.x,
                    this.centerPoint.y,
                    this.radius,
                    this.startAngle,
                    this.endAngle,
                    this.isAntiClockwise,
                    this.transform
                );
            }
        }

        export class Line extends Shape implements StrokeShape {

            public static fromGeometry(geometry: LineGeometry, strokeBrush?: BrushDefinition, strokeWidth?: number) {
                const result = new Line();
                result.startPoint = geometry.startPoint;
                result.endPoint = geometry.endPoint;

                if (strokeWidth !== undefined) {
                    result.strokeWidth = strokeWidth;
                }

                if (strokeBrush !== undefined) {
                    result.strokeBrush = strokeBrush;
                }

                return result;
            }

            public strokeBrush: BrushDefinition;
            public strokeWidth: number;

            public startPoint: Point = createPoint();
            public endPoint: Point = createPoint();

            protected onRender(gfx: CoreGraphics): void {
                gfx.drawLine(
                    this.startPoint.x,
                    this.startPoint.y,
                    this.endPoint.x,
                    this.endPoint.y,
                    this.transform
                );
            }
        }

        export class Rectangle extends Shape implements StrokeShape, FillShape {

            public static fromGeometry(geometry: RectangleGeometry, strokeBrush?: BrushDefinition, strokeWidth?: number, fillBrush?: BrushDefinition) {
                const result = new Rectangle();
                result.origin = geometry.origin;
                result.width = geometry.width;
                result.height = geometry.height;

                if (strokeWidth !== undefined) {
                    result.strokeWidth = strokeWidth;
                }

                if (strokeBrush !== undefined) {
                    result.strokeBrush = strokeBrush;
                }

                if (fillBrush !== undefined) {
                    result.fillBrush = fillBrush;
                }

                return result;
            }

            public fillBrush: BrushDefinition;
            public strokeBrush: BrushDefinition;
            public strokeWidth: number;

            public origin: Point = createPoint();
            public width: number;
            public height: number;
            public cornerRadius: CornersRadiusDefinition;

            protected onRender(gfx: CoreGraphics): void {
                gfx.drawRoundedRectangle(
                    this.origin.x,
                    this.origin.y,
                    this.width,
                    this.height,
                    this.cornerRadius,
                    this.transform
                );
            }
        }

        export class Ellipse extends Shape implements StrokeShape, FillShape {

			public static fromGeometry(geometry: EllipseGeometry, strokeBrush?: BrushDefinition, strokeWidth?: number, fillBrush?: BrushDefinition) {
                const result = new Ellipse();
                result.centerPoint = geometry.centerPoint;
                result.radiusX = geometry.radiusX;
                result.radiusY = geometry.radiusY;

                if (strokeWidth !== undefined) {
                    result.strokeWidth = strokeWidth;
                }

                if (strokeBrush !== undefined) {
                    result.strokeBrush = strokeBrush;
                }

                if (fillBrush !== undefined) {
                    result.fillBrush = fillBrush;
                }

                return result;
            }

            public fillBrush: BrushDefinition;
            public strokeBrush: BrushDefinition;
            public strokeWidth: number;

            public centerPoint: Point = createPoint();
            public radiusX: number = 0;
            public radiusY: number = 0;

            protected onRender(gfx: CoreGraphics): void {
                gfx.drawEllipse(
                    this.centerPoint.x,
                    this.centerPoint.y,
                    this.radiusX,
                    this.radiusY,
                    this.transform
                );
            }
        }

        export class Polygonal extends Shape implements StrokeShape, FillShape {

			public static fromGeometry(geometry: PolygonalGeometry, strokeBrush?: BrushDefinition, strokeWidth?: number, fillBrush?: BrushDefinition) {
                const result = new Polygonal();
                result.isClosed = geometry.isClosed;
                result.points = geometry.points;

                if (strokeWidth !== undefined) {
                    result.strokeWidth = strokeWidth;
                }

                if (strokeBrush !== undefined) {
                    result.strokeBrush = strokeBrush;
                }

                if (fillBrush !== undefined) {
                    result.fillBrush = fillBrush;
                }

                return result;
            }

            public fillBrush: BrushDefinition;
            public strokeBrush: BrushDefinition;
            public strokeWidth: number;

            public points: Point[] = new Array<Point>();
            public isClosed: boolean;

            protected onRender(gfx: CoreGraphics): void {
                if (this.isClosed) {
                    gfx.drawPolygon(
                        this.points,
                        this.transform
                    );
                } else {
                    gfx.drawPolyline(
                        this.points,
                        this.transform
                    );
                }
            }
        }

        export class QuadraticCurve extends Shape implements StrokeShape, FillShape {

			public static fromGeometry(geometry: QuadraticCurveGeometry, strokeBrush?: BrushDefinition, strokeWidth?: number, fillBrush?: BrushDefinition) {
                const result = new QuadraticCurve();
                result.isClosed = geometry.isClosed;
                result.points = geometry.points;
				result.controlPoints = geometry.controlPoints;

                if (strokeWidth !== undefined) {
                    result.strokeWidth = strokeWidth;
                }

                if (strokeBrush !== undefined) {
                    result.strokeBrush = strokeBrush;
                }

                if (fillBrush !== undefined) {
                    result.fillBrush = fillBrush;
                }

                return result;
            }

            public fillBrush: BrushDefinition;
            public strokeBrush: BrushDefinition;
            public strokeWidth: number;

            public points: Point[] = new Array<Point>();
            public controlPoints: Point[] = new Array<Point>();
            public isClosed: boolean;

            protected onRender(gfx: CoreGraphics): void {
                gfx.drawQuadraticCurve(
                    this.points,
                    this.controlPoints,
                    this.isClosed,
                    this.transform
                );
            }
        }

        export class CubicCurve extends Shape implements StrokeShape, FillShape {

			public static fromGeometry(geometry: CubicCurveGeometry, strokeBrush?: BrushDefinition, strokeWidth?: number, fillBrush?: BrushDefinition) {
                const result = new CubicCurve();
                result.isClosed = geometry.isClosed;
                result.points = geometry.points;
				result.controlPoints1 = geometry.controlPoints1;
				result.controlPoints2 = geometry.controlPoints2;

                if (strokeWidth !== undefined) {
                    result.strokeWidth = strokeWidth;
                }

                if (strokeBrush !== undefined) {
                    result.strokeBrush = strokeBrush;
                }

                if (fillBrush !== undefined) {
                    result.fillBrush = fillBrush;
                }

                return result;
            }

            public fillBrush: BrushDefinition;
            public strokeBrush: BrushDefinition;
            public strokeWidth: number;

            public points: Point[] = new Array<Point>();
            public controlPoints1: Point[] = new Array<Point>();
            public controlPoints2: Point[] = new Array<Point>();
            public isClosed: boolean;

            protected onRender(gfx: CoreGraphics): void {
                gfx.drawCubicCurve(
                    this.points,
                    this.controlPoints1,
                    this.controlPoints2,
                    this.isClosed,
                    this.transform
                );
            }
        }

        export class Image extends Shape implements StrokeShape {

            public static fromGeometry(geometry: ImageGeometry, strokeBrush?: BrushDefinition, strokeWidth?: number) {
                const result = new Image();
                result.origin = geometry.origin;
                result.width = geometry.width;
                result.height = geometry.height;

                if (strokeWidth !== undefined) {
                    result.strokeWidth = strokeWidth;
                }

                if (strokeBrush !== undefined) {
                    result.strokeBrush = strokeBrush;
                }

                return result;
            }

            public fillBrush: BrushDefinition;
            public strokeBrush: BrushDefinition;
            public strokeWidth: number;

            public image: CanvasImageSource;
            public origin: Point = createPoint();
            public width: number;
            public height: number;

            protected onRender(gfx: CoreGraphics): void {
                gfx.drawImage(
                    this.image,
                    this.origin.x,
                    this.origin.y,
                    this.width,
                    this.height,
                    this.transform
                );
            }

        }

        export class Text extends Shape implements StrokeShape, FillShape {

			public static fromGeometry(geometry: TextGeometry, strokeBrush?: BrushDefinition, strokeWidth?: number, fillBrush?: BrushDefinition) {
                const result = new Text();
                result.origin = geometry.origin;
                result.text = geometry.text;

                if (strokeWidth !== undefined) {
                    result.strokeWidth = strokeWidth;
                }

                if (strokeBrush !== undefined) {
                    result.strokeBrush = strokeBrush;
                }

				if (fillBrush !== undefined) {
                    result.fillBrush = fillBrush;
                }

                return result;
            }

            public fillBrush: BrushDefinition;
            public strokeBrush: BrushDefinition;
            public strokeWidth: number;

            public text: string;
            public origin: Point = createPoint();

            protected onRender(gfx: CoreGraphics): void {
                gfx.drawText(
                    this.origin.x,
                    this.origin.y,
                    this.text,
                    this.transform
                );
            }
        }

        export class Path extends Shape implements StrokeShape, FillShape {

			public static fromGeometry(geometry: PathGeometry, strokeBrush?: BrushDefinition, strokeWidth?: number, fillBrush?: BrushDefinition) {
                const result = new Path();
                result.origin = geometry.origin;
                result.path = geometry.path;
				result.fillRule = geometry.fillRule;

                if (strokeWidth !== undefined) {
                    result.strokeWidth = strokeWidth;
                }

                if (strokeBrush !== undefined) {
                    result.strokeBrush = strokeBrush;
                }

				if (fillBrush !== undefined) {
                    result.fillBrush = fillBrush;
                }

                return result;
            }

            public fillBrush: BrushDefinition;
            public strokeBrush: BrushDefinition;
            public strokeWidth: number;

            public path: Path2D;
            public origin: Point = createPoint();
            public fillRule?: CanvasFillRule;

            protected onRender(gfx: CoreGraphics): void {
                gfx.drawPath2D(
                    this.origin.x,
                    this.origin.y,
                    this.path,
                    this.fillRule,
                    this.transform
                );
            }
        }

        export class Pie extends Shape implements StrokeShape, FillShape {

            public static fromGeometry(geometry: ArcGeometry, strokeBrush?: BrushDefinition, strokeWidth?: number, fillBrush?: BrushDefinition) {
				const result = new Pie();
				result.centerPoint = geometry.centerPoint;
				result.endAngle = geometry.endAngle;
				result.isAntiClockwise = geometry.isAntiClockwise;
				result.radius = geometry.radius;
				result.startAngle = geometry.startAngle;

				if (strokeWidth !== undefined) {
                    result.strokeWidth = strokeWidth;
                }

                if (strokeBrush !== undefined) {
                    result.strokeBrush = strokeBrush;
                }

				if (fillBrush !== undefined) {
                    result.fillBrush = fillBrush;
                }

				return result;
			}

            public fillBrush: BrushDefinition;
            public strokeBrush: BrushDefinition;
            public strokeWidth: number;

            public centerPoint: Point = createPoint();
            public radius: number = 0;
            public startAngle: number = 0;
            public endAngle: number = 0;
            public isAntiClockwise: boolean;

            protected onRender(gfx: CoreGraphics): void {
                gfx.drawPie(
                    this.centerPoint.x,
                    this.centerPoint.y,
                    this.radius,
                    this.startAngle,
                    this.endAngle,
                    this.isAntiClockwise,
                    this.transform
                );
            }
        }

        export class Donut extends Shape implements StrokeShape, FillShape {

			public static fromGeometry(geometry: DonutGeometry, strokeBrush?: BrushDefinition, strokeWidth?: number, fillBrush?: BrushDefinition) {
				const result = new Donut();
				result.centerPoint = geometry.centerPoint;
				result.endAngle = geometry.endAngle;
				result.endRadius = geometry.endRadius;
				result.isAntiClockwise = geometry.isAntiClockwise;
				result.startAngle = geometry.startAngle;
				result.startRadius = geometry.startRadius;

				if (strokeWidth !== undefined) {
                    result.strokeWidth = strokeWidth;
                }

                if (strokeBrush !== undefined) {
                    result.strokeBrush = strokeBrush;
                }

				if (fillBrush !== undefined) {
                    result.fillBrush = fillBrush;
                }

				return result;
			}

            public fillBrush: BrushDefinition;
            public strokeBrush: BrushDefinition;
            public strokeWidth: number;

            public centerPoint: Point = createPoint();
            public startRadius: number = 0;
            public endRadius: number = 0;
            public startAngle: number = 0;
            public endAngle: number = 0;
            public isAntiClockwise?: boolean;


            protected onRender(gfx: CoreGraphics): void {
                gfx.drawDonut(
                    this.centerPoint.x,
                    this.centerPoint.y,
                    this.startRadius,
                    this.endRadius,
                    this.startAngle,
                    this.endAngle,
                    this.isAntiClockwise,
                    this.transform
                );
            }
        }
    }
}