/**
 * Cab Connect - Asset Generation Script
 * Converts SVG assets to PNG format with correct dimensions
 * 
 * Usage: node generate-assets.js
 * 
 * Requirements: npm install sharp
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const assets = [
    {
        input: 'icon.svg',
        output: 'icon.png',
        width: 1024,
        height: 1024,
        description: 'App Icon'
    },
    {
        input: 'adaptive-icon.svg',
        output: 'adaptive-icon.png',
        width: 1024,
        height: 1024,
        description: 'Android Adaptive Icon'
    },
    {
        input: 'splash.svg',
        output: 'splash.png',
        width: 1284,
        height: 2778,
        description: 'Splash Screen'
    },
    {
        input: 'favicon.svg',
        output: 'favicon.png',
        width: 48,
        height: 48,
        description: 'Favicon'
    }
];

async function generateAsset(asset) {
    const inputPath = path.join(__dirname, asset.input);
    const outputPath = path.join(__dirname, asset.output);

    try {
        console.log(`🎨 Generating ${asset.description}...`);

        if (!fs.existsSync(inputPath)) {
            console.error(`❌ Error: ${asset.input} not found`);
            return false;
        }

        await sharp(inputPath)
            .resize(asset.width, asset.height, {
                fit: 'contain',
                background: { r: 0, g: 0, b: 0, alpha: 0 }
            })
            .png({ quality: 100 })
            .toFile(outputPath);

        const stats = fs.statSync(outputPath);
        const fileSizeKB = (stats.size / 1024).toFixed(2);

        console.log(`✅ ${asset.description} created: ${asset.output} (${fileSizeKB} KB)`);
        return true;
    } catch (error) {
        console.error(`❌ Error generating ${asset.description}:`, error.message);
        return false;
    }
}

async function generateAllAssets() {
    console.log('🚀 Cab Connect - Generating App Assets\n');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    let successCount = 0;
    let failCount = 0;

    for (const asset of assets) {
        const success = await generateAsset(asset);
        if (success) {
            successCount++;
        } else {
            failCount++;
        }
        console.log(''); // Empty line between assets
    }

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log(`📊 Summary:`);
    console.log(`   ✅ Success: ${successCount}`);
    console.log(`   ❌ Failed: ${failCount}`);
    console.log(`\n✨ Asset generation complete!\n`);

    if (successCount === assets.length) {
        console.log('🎉 All assets generated successfully!');
        console.log('\n📱 Next steps:');
        console.log('   1. Run: npx expo start');
        console.log('   2. Test the splash screen and app icon');
        console.log('   3. Adjust designs if needed (edit SVG files)');
        console.log('   4. Rebuild: npx expo prebuild --clean\n');
    } else {
        console.log('⚠️  Some assets failed to generate.');
        console.log('   Check the errors above and try again.\n');
    }
}

// Check if sharp is installed
try {
    require.resolve('sharp');
    generateAllAssets();
} catch (e) {
    console.error('❌ Error: sharp library not found');
    console.log('\n📦 Please install sharp first:');
    console.log('   npm install --save-dev sharp\n');
    console.log('Then run this script again:');
    console.log('   node generate-assets.js\n');
}
