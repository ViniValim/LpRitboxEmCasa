function requireAll(r) {
    r.keys().forEach(r);
}
requireAll(require.context('../svg', true, /\.svg$/));
requireAll(require.context('../images', true, /\.(png|jpe?g|gif)$/i));