const { Recipe, RecipeTags, Tag, Review, User, RecipeUser } = require('../models');

const isDev = process.env.NODE_ENV === 'development';

const dbInit = async () => {
    try {
        await User.sync({ alter: isDev });
        await Recipe.sync({ alter: isDev });
        await Tag.sync({ alter: isDev });
        await Review.sync({ alter: isDev });
        await RecipeTags.sync({ alter: isDev });
        await RecipeUser.sync({ alter: isDev });
        console.log('Database synchronization successful');
    } catch (error) {
        console.error('Database synchronization failed:', error);
    }
};

export default dbInit;
