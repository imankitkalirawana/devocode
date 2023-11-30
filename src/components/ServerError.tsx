import "../css/ServerError.css";

const ServerError = () => {
  return (
    <div className="section-error">
      <div className="icon">
        <div className="icon-bg" style={{ width: 500, height: 500 }}>
          <svg width={500} height={500} viewBox="0 0 500 500">
            <g transform="translate(300, 250)">
              <path
                d="M75,-77.8C98.9,-29.8,121.1,1.4,119.7,35.2C118.2,69,93.2,105.2,53.4,132.8C13.600000000000001,160.4,-40.9,179.3,-68.2,159.4C-95.5,139.4,-95.5,80.6,-115.2,19.200000000000003C-134.8,-42.2,-174.1,-106.2,-158.2,-152.3C-142.3,-198.5,-71.1,-226.7,-22.8,-208.6C25.5,-190.4,51.1,-125.7,75,-77.8Z"
                fill="#D9E3F8"
                stroke="none"
                strokeWidth={0}
              />
            </g>
            <g transform="translate(250, 250)">
              <path
                d="M153.8,-195C192,-183.9,210.6,-129.2,213.1,-79.2C215.6,-29.3,201.9,16,173.1,41.3C144.3,66.7,100.4,72.2,69,91C37.6,109.8,18.8,141.9,-12.7,159.4C-44.3,176.9,-88.6,179.9,-105.7,156.5C-122.8,133,-112.8,83.2,-124.2,41.8C-135.7,0.4,-168.7,-32.5,-177.7,-74.1C-186.7,-115.7,-171.8,-165.8,-138.2,-178.4C-104.6,-191,-52.3,-166,2.7,-169.8C57.8,-173.6,115.6,-206.1,153.8,-195Z"
                fill="#E8EFFF"
                stroke="none"
                strokeWidth={0}
              />
            </g>
          </svg>
        </div>
        <div className="server">
          <svg className="server-shock" width={200}>
            <path
              d="m 160 30 l 13 2 l -11 14 l 7 5 l -12 13 l 6 -11 l -9 -5 z "
              style={{ transform: "rotate(20deg)" }}
              fill="#d4ddff"
            />
            <path
              d="m 90 -10 l 12 -2 l -2 12 l 5 0 l -9 17 l 3 -12 l -5 0 z "
              style={{
                transform: "rotate(20deg)",
                position: "absolute",
                top: "-10px",
              }}
              fill="#d4ddff"
            />
            <path
              d="m -20 60 l 15 -3 l -5 24 l -8 -2 l 3 14 l -11 -20 l 9 2 z "
              style={{ transform: "rotate(-30deg) scale(0.8)" }}
              fill="#d4ddff"
            />
          </svg>
          <div className="server-disc" />
          <div className="server-lights">
            <span />
            <span />
          </div>
          <div className="server-cool" />
          <div className="mo-fire">
            <svg
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              width="125px"
              height="189.864px"
              viewBox="0 0 125 189.864"
              enableBackground="new 0 0 125 189.864"
              xmlSpace="preserve"
            >
              <path
                className="flame-main"
                fill="#F36E21"
                d="M76.553,186.09c0,0-10.178-2.976-15.325-8.226s-9.278-16.82-9.278-16.82s-0.241-6.647-4.136-18.465
																									 c0,0,3.357,4.969,5.103,9.938c0,0-5.305-21.086,1.712-30.418c7.017-9.333,0.571-35.654-2.25-37.534c0,0,13.07,5.64,19.875,47.54
																									 c6.806,41.899,16.831,45.301,6.088,53.985"
              />
              <path
                className="flame-main one"
                fill="#F6891F"
                d="M61.693,122.257c4.117-15.4,12.097-14.487-11.589-60.872c0,0,32.016,10.223,52.601,63.123
																											 c20.585,52.899-19.848,61.045-19.643,61.582c0.206,0.537-19.401-0.269-14.835-18.532S57.576,137.656,61.693,122.257z"
              />
              <path
                className="flame-main two"
                fill="#FFD04A"
                d="M81.657,79.192c0,0,11.549,24.845,3.626,40.02c-7.924,15.175-21.126,41.899-0.425,64.998
																											 C84.858,184.21,125.705,150.905,81.657,79.192z"
              />
              <path
                className="flame-main three"
                fill="#FDBA16"
                d="M99.92,101.754c0,0-23.208,47.027-12.043,80.072c0,0,32.741-16.073,20.108-45.79
																												 C95.354,106.319,99.92,114.108,99.92,101.754z"
              />
              <path
                className="flame-main four"
                fill="#F36E21"
                d="M103.143,105.917c0,0,8.927,30.753-1.043,46.868c-9.969,16.115-14.799,29.041-14.799,29.041
																												S134.387,164.603,103.143,105.917z"
              />
              <path
                className="flame-main five"
                fill="#FDBA16"
                d="M62.049,104.171c0,0-15.645,67.588,10.529,77.655C98.753,191.894,69.033,130.761,62.049,104.171z"
              />
              <path
                className="flame"
                fill="#F36E21"
                d="M101.011,112.926c0,0,8.973,10.519,4.556,16.543C99.37,129.735,106.752,117.406,101.011,112.926z"
              />
              <path
                className="flame one"
                fill="#F36E21"
                d="M55.592,126.854c0,0-3.819,13.29,2.699,16.945C64.038,141.48,55.907,132.263,55.592,126.854z"
              />
              <path
                className="flame two"
                fill="#F36E21"
                d="M54.918,104.595c0,0-3.959,6.109-1.24,8.949C56.93,113.256,52.228,107.329,54.918,104.595z"
              />
            </svg>
          </div>
        </div>
        <div className="boy">
          <span className="boy-shirt">
            <div className="boy-badge">
              <div className="image">
                <i className="fas fa-align-left" />
              </div>
            </div>
          </span>
          <div className="boy-head">
            <svg height={150} width={150} className="boy-face">
              <path
                d="m 50 10 q 25 0 23 30 q -3 19 -23 20 q -19 -1 -22 -20 q -2 -30 22 -30"
                stroke="none"
                strokeWidth={1}
                fill="#f2daa0"
              />
            </svg>
            <svg height={150} width={150} className="boy-hair">
              <path
                d="m 50 40 q 8 0 15 -12 q 5 5 5 15 q 5 -25 -10 -30 q -10 -3 -20 0 q -14 5 -10 30 q 0 -5 3 -10 q 2 2 2 5 q 3 -1 5 -5 q 2 3 2 7 q 4 0 7 -7 q 2 3 0 7 z "
                stroke="#222"
                strokeWidth={1}
                fill="#222"
                width={150}
                height={150}
              />
            </svg>
            <svg height={50} width={50} className="boy-hair-lick-1">
              <path
                d="m 0 0 q 10 2 10 10 q 0 5 -5 10 q 3 -7 -5 -20 z"
                stroke="#222"
                strokeWidth={1}
                fill="#222"
              />
            </svg>
            <svg height={50} width={50} className="boy-hair-lick-2">
              <path
                d="m 0 0 q 10 2 10 10 q 0 5 -5 10 q 3 -7 -5 -20 z"
                stroke="#222"
                strokeWidth={1}
                fill="#222"
              />
            </svg>
            <div className="boy-ears">
              <span className="left-ear" />
              <span className="right-ear" />
            </div>
            {/* 			<svg height="100" width="100" class="tear">
			<path d="m 20 0 q 0 5 5 15 q 8 14 -5 15 q -13 -1 -5 -15 q 3 -6 5 -15 z " stroke="#bad9ff" stroke-width="2" fill="#bad9ff" />
		 </svg> */}
            <div className="boy-eyes">
              <span className="left-eye" />
              <span className="right-eye" />
            </div>
            <div className="boy-brows">
              <span className="left-brow" />
              <span className="right-brow" />
            </div>
            <div className="boy-mouth" />
            {/* 			<svg height="100" width="100" class="boy-stache">
			<path d="m 5 10 c 5 10 15 -15 30 0 c 15 -15 25 10 30 0 c -5 15 -30 5 -30 5 c -10 5 -30 5 -30 -5" stroke="#222" stroke-width="1" fill="#222"/>
		 </svg> */}
          </div>
        </div>
        <div className="palm-left" />
        <div className="palm-right" />
        <ul className="fingers-left">
          <li />
          <li />
          <li />
          <li />
          <li>
            <span />
          </li>
        </ul>
        <ul className="fingers-right">
          <li />
          <li />
          <li />
          <li />
          <li>
            <span />
          </li>
        </ul>
        <div className="keyboard">
          <span className="key" />
          <span className="key" />
          <span className="key" />
          <span className="key" />
          <span className="key" />
          <span className="key" />
          <span className="key" />
          <span className="key" />
          <span className="key" />
        </div>
      </div>
      <div className="error">
        <p className="error-message">Internal Server Error</p>
      </div>
    </div>
  );
};

export default ServerError;
