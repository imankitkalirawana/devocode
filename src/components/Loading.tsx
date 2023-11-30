const Loading = () => {
  return (
    <div className="loading-resources server-error">
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <g
          fill="none"
          stroke="#333"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="6"
        >
          {/* left line */}
          <path d="M 21 40 V 59">
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="rotate"
              values="0 21 59; 180 21 59"
              dur="2s"
              repeatCount="indefinite"
            />
          </path>
          {/* right line */}
          <path d="M 79 40 V 59">
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="rotate"
              values="0 79 59; -180 79 59"
              dur="2s"
              repeatCount="indefinite"
            />
          </path>
          {/* top line */}
          <path d="M 50 21 V 40">
            <animate
              attributeName="d"
              values="M 50 21 V 40; M 50 59 V 40"
              dur="2s"
              repeatCount="indefinite"
            />
          </path>
          {/* btm line */}
          <path d="M 50 60 V 79">
            <animate
              attributeName="d"
              values="M 50 60 V 79; M 50 98 V 79"
              dur="2s"
              repeatCount="indefinite"
            />
          </path>
          {/* top box */}
          <path d="M 50 21 L 79 40 L 50 60 L 21 40 Z">
            <animate
              attributeName="stroke"
              values="rgba(51,51,51,1); rgba(255,255,255,0)"
              dur="2s"
              repeatCount="indefinite"
            />
          </path>
          {/* mid box */}
          <path d="M 50 40 L 79 59 L 50 79 L 21 59 Z" />
          {/* btm box */}
          <path d="M 50 59 L 79 78 L 50 98 L 21 78 Z">
            <animate
              attributeName="stroke"
              values="rgba(255,255,255,0); rgba(51,51,51,1)"
              dur="2s"
              repeatCount="indefinite"
            />
          </path>
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="translate"
            values="0 0; 0 -19"
            dur="2s"
            repeatCount="indefinite"
          />
        </g>
      </svg>
      <p className="error-message">Loading resources for you...</p>
    </div>
  );
};

export default Loading;
