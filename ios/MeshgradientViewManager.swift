import UIKit
import SwiftUI

@objc(MeshgradientViewManager)
class MeshGradientViewManager: RCTViewManager {
    override func view() -> UIView! {
        return MeshGradientUIView()
    }

    override static func requiresMainQueueSetup() -> Bool {
        return false
    }
}

class MeshGradientUIView: UIView {
    private var hostingController: UIHostingController<AnyView>?

    @objc var width: NSNumber = 1 {
        didSet { setupGradient() }
    }
    @objc var height: NSNumber = 1 {
        didSet { setupGradient() }
    }
    @objc var points: NSArray = [] {
        didSet { setupGradient() }
    }
    @objc var colors: NSArray = [] {
        didSet { setupGradient() }
    }

    override init(frame: CGRect) {
        super.init(frame: frame)
        setupGradient()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupGradient()
    }

    func convertToSIMD2(numbers: [[NSNumber]]) -> [SIMD2<Float>] {
        return numbers.map { pair in
            guard pair.count >= 2 else { fatalError("Each pair must contain at least two numbers") }

            let x = pair[0].floatValue
            let y = pair[1].floatValue

            return SIMD2<Float>(x, y)
        }
    }

    private func setupGradient() {

      guard let pointsArray = points as? [[NSNumber]], pointsArray.count > 0 else { return }
      guard let colorsArray = colors as? [String], colorsArray.count > 0 else { return }

      let convertedPoints = convertToSIMD2(numbers: pointsArray.map { $0.map { $0 } })

      let convertedColors = colorsArray.map { Color(hex: $0) }

      let meshGradient = MeshGradient(
          width: 3,
          height: 3,
          points: convertedPoints,
          colors: convertedColors,
          smoothsColors: true
      ).ignoresSafeArea()

      let hostingController = UIHostingController(rootView: meshGradient)
      hostingController.view.translatesAutoresizingMaskIntoConstraints = false

      self.addSubview(hostingController.view)

      NSLayoutConstraint.activate([
        hostingController.view.topAnchor.constraint(equalTo: self.topAnchor),
        hostingController.view.leadingAnchor.constraint(equalTo: self.leadingAnchor),
        hostingController.view.trailingAnchor.constraint(equalTo: self.trailingAnchor),
        hostingController.view.bottomAnchor.constraint(equalTo: self.bottomAnchor)
      ])

    }

    override func layoutSubviews() {
        super.layoutSubviews()
        hostingController?.view.frame = self.bounds
    }
}

extension Color {
    init(hex: String) {
        let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var int = UInt64()
        Scanner(string: hex).scanHexInt64(&int)
        let a, r, g, b: UInt64
        switch hex.count {
        case 3: // RGB (12-bit)
            (a, r, g, b) = (255, (int >> 8) * 17, (int >> 4 & 0xF) * 17, (int & 0xF) * 17)
        case 6: // RGB (24-bit)
            (a, r, g, b) = (255, int >> 16, int >> 8 & 0xFF, int & 0xFF)
        case 8: // ARGB (32-bit)
            (a, r, g, b) = (int >> 24, int >> 16 & 0xFF, int >> 8 & 0xFF, int & 0xFF)
        default:
            (a, r, g, b) = (255, 0, 0, 0)
        }
        self.init(
            .sRGB,
            red: Double(r) / 255,
            green: Double(g) / 255,
            blue: Double(b) / 255,
            opacity: Double(a) / 255
        )
    }
}
