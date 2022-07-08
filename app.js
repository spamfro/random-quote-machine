(function (React, ReactDOM) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
    var ReactDOM__default = /*#__PURE__*/_interopDefaultLegacy(ReactDOM);

    //--------------------------------------------------------------------------------------------------
    const quotes = () => {
        const quotes = [
            {
                text: 'Challenges are what make life interesting and overcoming them is what makes life meaningful.',
                author: 'Joshua J. Marine'
            },
            {
                text: 'The only way to do great work is to love what you do.',
                author: 'Steve Jobs'
            }
        ];
        let i = 0;
        const nextQuote = () => quotes[i++ % quotes.length];
        const requestQuote = () => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    const quote = nextQuote();
                    if (i % 3 == 1) {
                        reject(Error('Failed to load!'));
                    }
                    else {
                        resolve(quote);
                    }
                }, 1000);
            });
        };
        // const requestQuote = () => Promise.resolve(nextQuote());
        return { requestQuote };
    };
    const services = { quotes: quotes() };
    //--------------------------------------------------------------------------------------------------
    const Message = ({ type, text, children = null }) => {
        const typeClassName = ['info', 'error'].filter(predefinedType => predefinedType == type);
        return (React__default["default"].createElement("div", { className: ['message', ...typeClassName].join(' ') },
            React__default["default"].createElement("span", { className: 'text' }, text),
            children));
    };
    const Action = ({ label, onAction }) => (React__default["default"].createElement("a", { className: 'link action', onClick: () => { onAction(); } }, label));
    //--------------------------------------------------------------------------------------------------
    const Quote = ({ quote: { text, author }, onNext = null }) => {
        const handleClick = (event) => {
            event.preventDefault();
            onNext();
        };
        return (React__default["default"].createElement("div", { className: 'box quote' },
            React__default["default"].createElement("p", { className: 'text' },
                React__default["default"].createElement("i", { className: 'fa fa-quote-left' }),
                React__default["default"].createElement("span", null,
                    " ",
                    text)),
            React__default["default"].createElement("p", { className: 'author' }, author),
            React__default["default"].createElement("button", { className: 'next btn', onClick: handleClick, disabled: !onNext }, "New Quote")));
    };
    //--------------------------------------------------------------------------------------------------
    const App = ({ services }) => {
        const [state, setState] = React.useState({});
        const fetchQuote = () => {
            setState(({ quote }) => ({ isLoading: true, quote }));
            services.quotes.requestQuote()
                .then((quote) => setState({ quote }))
                .catch(({ message: error }) => setState({ error }));
        };
        React.useEffect(fetchQuote, []);
        const { isLoading, error, quote } = state;
        const showQuote = !!quote && !error;
        const showError = !!error;
        const showLoading = !quote && isLoading;
        return (React__default["default"].createElement(React__default["default"].Fragment, null,
            showQuote && React__default["default"].createElement(Quote, { quote: quote, onNext: isLoading ? null : fetchQuote }),
            showError && React__default["default"].createElement(Message, { type: 'error', text: error },
                React__default["default"].createElement(Action, { label: 'Retry', onAction: fetchQuote })),
            showLoading && React__default["default"].createElement(Message, { type: 'info', text: 'Loading...' })));
    };
    //--------------------------------------------------------------------------------------------------
    ReactDOM__default["default"].render(React__default["default"].createElement(App, { services: services }), document.getElementById('app'));

})(React, ReactDOM);
