#!/bin/bash

# Deployment script for Holivo
# This script builds the Next.js app and optionally copies to public_html

set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Building Next.js application...${NC}"
npm run build

# If DEPLOY_PATH is set, copy files there
if [ -n "$DEPLOY_PATH" ]; then
    echo -e "${BLUE}Copying files to $DEPLOY_PATH...${NC}"
    
    # Create destination if it doesn't exist
    mkdir -p "$DEPLOY_PATH"
    
    # Copy all contents from out folder
    cp -r out/* "$DEPLOY_PATH/"
    
    # Copy .htaccess if it exists
    if [ -f ".htaccess" ]; then
        cp .htaccess "$DEPLOY_PATH/"
        echo -e "${GREEN}✓ Copied .htaccess${NC}"
    fi
    
    echo -e "${GREEN}✓ Deployment complete! Files copied to $DEPLOY_PATH${NC}"
else
    echo -e "${GREEN}✓ Build complete! Files are in the 'out' folder${NC}"
    echo -e "${BLUE}To deploy, set DEPLOY_PATH environment variable:${NC}"
    echo -e "${BLUE}  DEPLOY_PATH=/path/to/public_html ./deploy.sh${NC}"
fi
