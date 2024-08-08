import React from "react";

type SVGProps = React.SVGProps<SVGSVGElement>;

const Email: React.FC<SVGProps> = (props) => {
  return (
    <svg
      width="50"
      height="50"
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_10_3182)">
        <path
          d="M45.8333 15.698V35.4167C45.8334 37.0109 45.2243 38.5449 44.1307 39.7048C43.037 40.8647 41.5414 41.5628 39.95 41.6563L39.5833 41.6667H10.4167C8.82247 41.6668 7.2885 41.0577 6.12861 39.9641C4.96873 38.8704 4.2706 37.3749 4.17707 35.7834L4.16666 35.4167V15.698L23.8437 28.8167L24.0854 28.9542C24.3702 29.0934 24.683 29.1657 25 29.1657C25.317 29.1657 25.6298 29.0934 25.9146 28.9542L26.1562 28.8167L45.8333 15.698Z"
          fill="currentColor"
        />
        <path
          d="M39.5833 8.33325C41.8333 8.33325 43.8063 9.52075 44.9062 11.3062L25 24.577L5.09375 11.3062C5.6161 10.4578 6.33378 9.74659 7.18689 9.23197C8.04 8.71734 9.00382 8.4142 9.99792 8.34784L10.4167 8.33325H39.5833Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_10_3182">
          <rect width="50" height="50" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Email;
