module.exports = {
    chainWebpack: (config) => {
        // GraphQL Loader
        config.module
            .rule('graphql', 'gql')
            .test(/\.(gql|graphql)$/)
            .use('graphql-tag/loader')
            .loader('graphql-tag/loader')
            .end()
            // CSS Loader
            .rule('scss')
            .test(/\.scss$/)
            .use('vue-style-loader', 'css-loader')
            .loader('sass-loader')
            .end();
    },
};
