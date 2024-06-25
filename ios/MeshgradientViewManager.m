#import <React/RCTViewManager.h>

@interface RCT_EXTERN_MODULE(MeshgradientViewManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(width, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(height, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(points, NSArray)
RCT_EXPORT_VIEW_PROPERTY(colors, NSArray)

@end
