export default function DeviceFrame({ children, alt, placeholder }) {
  return (
    <div className="device-frame">
      <div className="device-frame-bar">
        <span className="device-dot" />
        <span className="device-dot" />
        <span className="device-dot" />
      </div>
      <div className="device-frame-content">
        {placeholder ? (
          <div className="device-placeholder">{alt || "Product visual"}</div>
        ) : (
          children
        )}
      </div>
    </div>
  );
}
