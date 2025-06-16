#!/bin/bash

echo "🚀 Setting up Husky, ESLint, Prettier in your React project..."

# Step 1: Ensure Git is initialized
if [ ! -d ".git" ]; then
  git init
  echo "✅ Initialized Git"
fi

# Step 2: Install Husky
npm install husky --save-dev
npx husky install
echo "✅ Husky installed"

# Step 3: Add husky to postinstall script in package.json
npx json -I -f package.json -e 'this.scripts["postinstall"] = "husky install"'
echo "✅ Added husky install to postinstall"

# Step 4: Add pre-commit hook
npx husky add .husky/pre-commit "npm run lint && npm run format"
chmod +x .husky/pre-commit
echo "✅ Added pre-commit hook"

# Step 5: Install ESLint and Prettier
npm install eslint prettier --save-dev
npx eslint --init
echo "✅ ESLint and Prettier installed"

# Step 6: Add lint and format scripts to package.json
npx json -I -f package.json -e 'this.scripts["lint"] = "eslint src --ext .js,.jsx"'
npx json -I -f package.json -e 'this.scripts["format"] = "prettier --write . "'
echo "✅ Added lint and format scripts"

# Step 7: Optional basic config files
echo '{ "singleQuote": true, "semi": false }' > .prettierrc
echo "✅ Created .prettierrc"

echo "🎉 Setup complete! Try making a commit to see Husky in action."
