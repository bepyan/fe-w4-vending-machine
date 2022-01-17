import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

    * {
        box-sizing: border-box;
        margin: 0px;
    }

    :root {
        --theme-color: #f9fafb;
        --theme-bg-color: rgba(16 18 27 / 40%);
        --border-color: rgba(113 119 144 / 25%);
        --inactive-color: rgb(113 119 144 / 78%);
        --content-title-color: #999ba5;
        --content-bg: rgb(146 151 179 / 13%);
        --title-color: rgba(255, 255, 255, 0.8);
        --subtitle-color: rgba(255, 255, 255, 0.6);
        --button-inactive: rgb(249 250 251 / 55%);
        --scrollbar-bg: rgb(1 2 3 / 40%);
    }

    body {
        background-image: url(https://wallpapershome.com/images/wallpapers/macos-big-sur-1280x720-dark-wwdc-2020-22655.jpg);
        background-size: cover;
        background-position: center;
        position: relative;
    }

    body,
    #root {
        width: 100%;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 2rem;
        & > * + * {
            margin-right: 1rem;
        }
    }

    ::-webkit-scrollbar {
        width: 6px;
        border-radius: 10px;
    }

    ::-webkit-scrollbar-track {
        background-color: transparent;
    }

    ::-webkit-scrollbar-thumb {
        background: var(--scrollbar-bg);
        border-radius: 10px;
    }
`;

export default GlobalStyle;
