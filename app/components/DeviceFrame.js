export default function DeviceFrame({ children, placeholder }) {
  if (placeholder) {
    return <div style={{ background: "var(--border)", minHeight: 300 }} />;
  }
  return children || null;
}
