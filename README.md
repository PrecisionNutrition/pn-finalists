# PN Finalists

This is a drop-in React component to display PN finalists in a quick, interactive manner. Scripts and styles are bundled using webpack, so all that's required is to include the app and vendor JS files, then add the React initializer.

## Installation

This tool is intended to work as a drop-in component on an existing site. As such, your best bet is to use Bower:

    bower install PrecisionNutrition/pn-finalists --save

You can also clone the latest version directly from GitHub:

    git clone git@github.com:PrecisionNutrition/pn-finalists.git

Once it's downloaded, add the following to the page where you want this component to show up (make sure to check the path to the component):

    <script src="/bower_components/pn-finalists/dist/pn-finalists.min.js" async></script>

## Using the Component

Since this component accepts props, it can't be fully bundled. To work around
this, the bundle attaches `React`, `ReactDOM`, and the `PNFinalists` component
to the `window` for later reference.

In its simplest form, use it like this:

    <div id="pn-finalists"></div>
    <script>
      ReactDOM.render(
        React.createElement(PNFinalists),
        document.getElementById('pn-finalists')
      );
    </script>

Note that this doesn't use JSX. That's to avoid an additional dependency for
loading a single component.
