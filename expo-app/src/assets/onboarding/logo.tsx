import React from 'react';
import Svg, { Circle, G, Path } from 'react-native-svg';

export function Logo() {
  return (
    <Svg width={230} height={73} viewBox="0 0 230 73" fill="none">
      <Path
        d="M13.145 73c-2.552 0-5.028-.334-7.426-1.003-2.367-.699-4.274-1.595-5.719-2.689l2.537-5.56c1.383 1.002 3.028 1.807 4.935 2.415 1.906.608 3.812.912 5.719.912 2.121 0 3.69-.304 4.704-.912 1.015-.638 1.522-1.474 1.522-2.507 0-.76-.307-1.383-.922-1.869-.584-.516-1.353-.926-2.306-1.23-.923-.304-2.183-.639-3.782-1.003-2.46-.578-4.474-1.155-6.042-1.732a9.993 9.993 0 01-4.059-2.78C1.2 53.764.646 52.062.646 49.936c0-1.854.507-3.525 1.522-5.014 1.014-1.52 2.536-2.72 4.566-3.601C8.794 40.44 11.3 40 14.252 40c2.06 0 4.074.243 6.042.73 1.968.486 3.69 1.184 5.165 2.096l-2.306 5.606c-2.982-1.671-5.965-2.507-8.947-2.507-2.091 0-3.644.335-4.659 1.003-.984.669-1.476 1.55-1.476 2.644s.57 1.914 1.707 2.461c1.168.517 2.936 1.033 5.304 1.55 2.46.577 4.474 1.155 6.042 1.732a9.83 9.83 0 014.012 2.735c1.138 1.246 1.707 2.932 1.707 5.06 0 1.822-.523 3.494-1.568 5.013-1.015 1.489-2.552 2.674-4.612 3.555-2.06.881-4.567 1.322-7.518 1.322zM53.21 65.616H38.222l-2.86 6.837h-7.656l14.39-31.906h7.38L63.91 72.453h-7.84l-2.86-6.837zm-2.352-5.606l-5.12-12.216L40.62 60.01h10.24zM96.87 40.547v31.906h-6.133L74.64 53.081v19.372h-7.38V40.547h6.18l16.051 19.372V40.547h7.38zM111.197 46.563h-10.331v-6.016H129v6.017h-10.331v25.889h-7.472v-25.89zM119.522 32.453l-6.212-8.888H106.454v8.888H99V.547h13.942c2.853 0 5.322.47 7.408 1.413 2.117.942 3.743 2.279 4.878 4.011 1.135 1.732 1.702 3.783 1.702 6.153 0 2.37-.583 4.422-1.748 6.154-1.135 1.701-2.761 3.008-4.878 3.92l7.224 10.255h-8.006zm-.138-20.329c0-1.793-.583-3.16-1.749-4.102-1.165-.972-2.868-1.458-5.107-1.458h-6.074v11.121h6.074c2.239 0 3.942-.486 5.107-1.458 1.166-.973 1.749-2.34 1.749-4.103zM179.121 33c-3.283 0-6.258-.699-8.927-2.097-2.638-1.428-4.724-3.388-6.258-5.88-1.503-2.522-2.254-5.363-2.254-8.523 0-3.16.751-5.986 2.254-8.478 1.534-2.522 3.62-4.482 6.258-5.88C172.863.714 175.854 0 179.167 0c2.791 0 5.307.486 7.546 1.459 2.27.972 4.172 2.37 5.706 4.193l-4.786 4.376c-2.178-2.492-4.877-3.738-8.098-3.738-1.994 0-3.773.44-5.338 1.322a9.285 9.285 0 00-3.681 3.6c-.859 1.55-1.288 3.313-1.288 5.288s.429 3.738 1.288 5.287a9.605 9.605 0 003.681 3.647c1.565.85 3.344 1.276 5.338 1.276 3.221 0 5.92-1.261 8.098-3.783l4.786 4.375c-1.534 1.854-3.436 3.267-5.706 4.24-2.27.972-4.801 1.458-7.592 1.458zM212.377 33c-3.344 0-6.365-.714-9.065-2.142-2.669-1.428-4.77-3.388-6.304-5.88-1.503-2.522-2.254-5.348-2.254-8.478s.751-5.94 2.254-8.432c1.534-2.522 3.635-4.498 6.304-5.926C206.012.714 209.033 0 212.377 0c3.344 0 6.35.714 9.019 2.142 2.668 1.428 4.77 3.404 6.303 5.926C229.233 10.559 230 13.37 230 16.5c0 3.13-.767 5.956-2.301 8.478-1.533 2.492-3.635 4.452-6.303 5.88-2.669 1.428-5.675 2.142-9.019 2.142zm0-6.29c1.902 0 3.62-.425 5.153-1.276a9.356 9.356 0 003.589-3.647c.89-1.55 1.335-3.312 1.335-5.287s-.445-3.738-1.335-5.287a9.045 9.045 0 00-3.589-3.601c-1.533-.881-3.251-1.322-5.153-1.322-1.902 0-3.62.44-5.154 1.322-1.533.85-2.745 2.051-3.635 3.6-.859 1.55-1.288 3.313-1.288 5.288s.429 3.738 1.288 5.287a9.703 9.703 0 003.635 3.647c1.534.85 3.252 1.276 5.154 1.276z"
        fill="#fff"
      />
      <Path fill="#F2D072" d="M133 67H158V73H133z" />
      <Path fill="#F2D072" d="M133 54H158V60H133z" />
      <Path fill="#F2D072" d="M133 40.5498H158V46.5498H133z" />
      <Path fill="#F2D072" d="M133 26.4502H158V32.450199999999995H133z" />
      <Path fill="#F2D072" d="M133 13.4502H158V19.450200000000002H133z" />
      <Path fill="#F2D072" d="M133 0H158V6H133z" />
    </Svg>
  );
}