import Document, {
    Html,
    Head,
    Main,
    NextScript,
    DocumentContext
} from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;

        try {
            ctx.renderPage = () => originalRenderPage({
                enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />)
            });

            const initialProps = await Document.getInitialProps(ctx);
            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                )
            };
        } finally {
            sheet.seal();
        }
    }

    render() {
        return (
            <Html className="html">
                <Head>
                    <link href="/fonts/style.css" rel="stylesheet" />
                </Head>
                <body className="body" data-theme="light">
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
