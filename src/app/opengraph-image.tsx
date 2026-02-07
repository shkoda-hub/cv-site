import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Artem Shkonda - Backend Developer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "monospace",
          position: "relative",
        }}
      >
        {/* Border */}
        <div
          style={{
            position: "absolute",
            top: 20,
            left: 20,
            right: 20,
            bottom: 20,
            border: "2px solid #98c379",
            display: "flex",
          }}
        />

        {/* Corner decorations */}
        <div
          style={{
            position: "absolute",
            top: 20,
            left: 20,
            width: 40,
            height: 40,
            borderLeft: "4px solid #98c379",
            borderTop: "4px solid #98c379",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 20,
            right: 20,
            width: 40,
            height: 40,
            borderRight: "4px solid #98c379",
            borderTop: "4px solid #98c379",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 20,
            left: 20,
            width: 40,
            height: 40,
            borderLeft: "4px solid #98c379",
            borderBottom: "4px solid #98c379",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 20,
            right: 20,
            width: 40,
            height: 40,
            borderRight: "4px solid #98c379",
            borderBottom: "4px solid #98c379",
            display: "flex",
          }}
        />

        {/* Terminal header */}
        <div
          style={{
            position: "absolute",
            top: 40,
            left: 50,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "#ff5f56",
              display: "flex",
            }}
          />
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "#ffbd2e",
              display: "flex",
            }}
          />
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "#27ca3f",
              display: "flex",
            }}
          />
          <span style={{ color: "#98c379", marginLeft: 16, fontSize: 16, opacity: 0.7 }}>
            artem@portfolio:~
          </span>
        </div>

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: "bold",
              color: "#98c379",
              textShadow: "0 0 20px rgba(152, 195, 121, 0.5)",
              display: "flex",
            }}
          >
            ARTEM SHKONDA
          </div>

          <div
            style={{
              fontSize: 36,
              color: "#98c379",
              opacity: 0.8,
              display: "flex",
            }}
          >
            BACKEND DEVELOPER
          </div>

          <div
            style={{
              fontSize: 24,
              color: "#98c379",
              opacity: 0.6,
              display: "flex",
              gap: 20,
              marginTop: 20,
            }}
          >
            <span>NODE.JS</span>
            <span>•</span>
            <span>TYPESCRIPT</span>
            <span>•</span>
            <span>POSTGRESQL</span>
            <span>•</span>
            <span>NESTJS</span>
          </div>
        </div>

        {/* Bottom prompt */}
        <div
          style={{
            position: "absolute",
            bottom: 50,
            fontSize: 20,
            color: "#98c379",
            opacity: 0.5,
            display: "flex",
          }}
        >
          {">"} ./view_portfolio.sh
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
