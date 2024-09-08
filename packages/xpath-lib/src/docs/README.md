# XPath Generator Library

## Overview

This library provides a comprehensive solution for generating XPath expressions in JavaScript. It supports both relative and absolute XPaths, handles iframes, and detects duplicate XPaths in the document. The library follows SOLID principles to ensure maintainability and scalability.

## Installation

```bash
npm install xpath-generator
```

## Usage

### Basic Usage

```bash
import XPathGenerator from 'xpath-generator';

const generator = new XPathGenerator();
const xpath = generator.generate(document.querySelector('#myElement'));
console.log(xpath);
```

### Generating Absolute XPath

```bash
const absoluteXpath = generator.generate(document.querySelector('#myElement'), true);
console.log(absoluteXpath);
```

### Detecting Duplicate XPaths

```bash
const duplicates = generator.detectDuplicateXPaths();
console.log(duplicates);
```

### Generating XPaths for Elements in Iframes

```bash
const iframe = document.querySelector('iframe');
const iframeXPaths = generator.generateForIframe(iframe);
console.log(iframeXPaths);
```
