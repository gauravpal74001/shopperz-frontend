interface SkeletonProps {
  width?: string;
  height?: string;
  margin?: string;
  borderRadius?: string;
}

const Skeleton = ({ width = "100%", height = "100%", margin = "0", borderRadius = "4px" }: SkeletonProps) => {
  return (
    <div
      className="skeleton"
      style={{
        width,
        height,
        margin,
        borderRadius,
        background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
        backgroundSize: "200% 100%",
        animation: "shimmer 1.5s infinite",
      }}
    />
  );
};

export default Skeleton; 