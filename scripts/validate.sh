#!/usr/bin/env bash

# Comprehensive validation script for Synctip
echo "Running comprehensive project validation..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Track overall success
VALIDATION_FAILED=0

# 1. Type Checking
print_status "Running TypeScript type checking..."
if npm run type-check; then
    print_success "Type checking passed"
else
    print_error "Type checking failed"
    VALIDATION_FAILED=1
fi

# 2. Code Formatting Check
print_status "Checking code formatting..."
if npm run format:check; then
    print_success "Code formatting is correct"
else
    print_warning "Code formatting issues found. Run 'npm run format' to fix"
    # Auto-fix formatting
    print_status "Auto-fixing formatting..."
    npm run format
fi

# 3. Linting
print_status "Running ESLint..."
if npm run lint; then
    print_success "Linting passed"
else
    print_warning "Linting issues found. Attempting to auto-fix..."
    npm run lint:fix
    if npm run lint; then
        print_success "Linting issues resolved"
    else
        print_error "Linting issues remain"
        VALIDATION_FAILED=1
    fi
fi

# 4. Unit Tests
print_status "Running unit tests..."
if npm test; then
    print_success "Unit tests passed"
else
    print_error "Unit tests failed"
    VALIDATION_FAILED=1
fi

# 5. Build Test
print_status "Testing build process..."
if npm run build; then
    print_success "Build completed successfully"
else
    print_error "Build failed"
    VALIDATION_FAILED=1
fi

# 6. Critical E2E Tests (if requested)
if [ "$1" = "--e2e" ] || [ "$1" = "--full" ]; then
    print_status "Running critical E2E tests..."
    if npm run test:e2e:critical; then
        print_success "Critical E2E tests passed"
    else
        print_error "Critical E2E tests failed"
        VALIDATION_FAILED=1
    fi
fi

# Summary
echo ""
echo "Validation Summary:"
echo "=================="

if [ $VALIDATION_FAILED -eq 0 ]; then
    print_success "All validations passed! Your code is ready."
    echo ""
    echo "You can now safely:"
    echo "  - Commit your changes"
    echo "  - Push to repository" 
    echo "  - Deploy to production"
    exit 0
else
    print_error "Some validations failed. Please fix the issues above."
    echo ""
    echo "Quick fixes you can try:"
    echo "  - npm run format        (fix formatting)"
    echo "  - npm run lint:fix      (fix linting)"
    echo "  - npm run type-check    (check types)"
    echo "  - npm test              (run unit tests)"
    exit 1
fi