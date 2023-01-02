# @chill-viking/layout

[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=chill-viking-org_ng-libs-cv-layout&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=chill-viking-org_ng-libs-cv-layout)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=chill-viking-org_ng-libs-cv-layout&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=chill-viking-org_ng-libs-cv-layout)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=chill-viking-org_ng-libs-cv-layout&metric=coverage)](https://sonarcloud.io/summary/new_code?id=chill-viking-org_ng-libs-cv-layout)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=chill-viking-org_ng-libs-cv-layout&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=chill-viking-org_ng-libs-cv-layout)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=chill-viking-org_ng-libs-cv-layout&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=chill-viking-org_ng-libs-cv-layout)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=chill-viking-org_ng-libs-cv-layout&metric=bugs)](https://sonarcloud.io/summary/new_code?id=chill-viking-org_ng-libs-cv-layout)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=chill-viking-org_ng-libs-cv-layout&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=chill-viking-org_ng-libs-cv-layout)

<!-- add status badge for publishing -->

This Angular package provides a layout component for your application that keeps its contents contained within the bounds of the web browser.
The layout consists of three sections: a header, a footer, and the body of the content.
Use it to give your application a consistent and organized look and feel.

## Installation

To install this package, run the following command in your terminal:

```bash
npm install @chill-viking/layout
```

## Usage

### Import

To use this package in your Angular project, import it in your module like so:

```typescript
import { ChillVikingLayoutModule } from '@chill-viking/layout';

@NgModule({
  imports: [ChillVikingLayoutModule],
})
export class MyModule {}
```

### Template

Then, you can use the `cvLayout` component in your templates and pass in data for the header and footer using the `[data]` attribute:

```html
<cv-layout
  [data]="{ header: { title$: title$ }, footer: { copyRightHolder: 'Chill Viking' } }"
>
  <ng-template cvHeader let-header>
    <h1>Custom header for {{ header.title$ | async }}</h1>
  </ng-template>
  <p>My Content</p>
  <ng-template cvFooter let-footer>
    <span>Copyright &copy; 2023 {{ footer.copyRightHolder }}</span>
  </ng-template>
</cv-layout>
```

All content without a `ng-template` and a directive will be rendered as the body of the layout.
The `cvHeader` and `cvFooter` directives are optional and can be omitted if desired.

### Object Types

The types used in `cvLayout` are as follows

```typescript
export type LayoutHeaderContext = {
  title$: Observable<string>;
};

export type LayoutFooterContext = {
  copyRightHolder?: string;
};

export type LayoutContext = {
  header: LayoutHeaderContext;
  footer?: LayoutFooterContext;
};
```

The type of the `[data]` input of `cvLayout` is `LayoutContext`.

### Injected Templates using Directives

The `cvHeader` directive should be used in an `ng-template` element with a `let-header` attribute,
and the `cvFooter` directive should be used in an `ng-template` element with a `let-footer` attribute.
The `let-header` attribute defines the data that will be provided to the template for the header,
and the `let-footer` attribute defines the data that will be provided to the template for the footer.

See [object types](#object-types) for details on the data that will be provided to the header and footer templates.
The `title$` property of the header object should be an `Observable` of type `string` that emits the title to display in the header.
The `copyRightHolder` property of the `footer` object is optional and should be a `string` that specifies the copyright holder to display in the footer.

#### Default Header Template

If a template is not provided for the header, the following will be the default used

```html
<h1>{{ header.title$ | async }}</h1>
```

#### Default Footer Template

There is no default template for the footer.

### Component

Here is an example of how you could set up the data in your component class:

```typescript
import { Observable } from 'rxjs';

@Component({
  selector: 'my-component',
  templateUrl: './my-component.html',
})
export class MyComponent {
  title$: Observable<string> = of('My Title');
}
```

You can then bind the `title$` property to the `cvLayout` component using the `[data]` attribute as shown [above](#template).

#### Defaults

The default for the `[data]` input of the component is:

```typescript
{
  header: {
    title$: of('[data] not provided'),
  },
  footer: undefined,
}
```

The `header` object is always included in the `data` input and has a default `title$`
property of `of('[data] not provided')` creating a header with `[data] not provided`.
The `footer` object is optional and has a default value of `undefined`.

## Contributing

We welcome contributions to this package! If you have an idea for a fun feature, feel free to [open a pull request](https://github.com/chill-viking/ng-libs), [create an issue](https://github.com/chill-viking/ng-libs/issues/new/choose), or [start a discussion](https://github.com/orgs/chill-viking/discussions/categories/ideas).

## License

This package is licensed under the GNU General Public License. See the [LICENSE](./LICENSE) file for more details.
