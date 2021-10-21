**Get the 3D model's variant/configuration information from the Visao viewer.**

A configuration/variant is a structure with selected properties within the 3D model file,
which will determine how the 3D model will be displayed.


#### Example
A 3D model of a shoe could have 2 different configuration/variant
of `green` and `blue` each displaying the same shoe in the matching color.

```typescript
// Get the configuration/variant information
let variantDisplayed;
let availableVariants;
visao.showModelVariant((info) => {
  // Do something with the data
  variantDisplayed = info.variant;
  availableVariants = info.variants;
});
```
