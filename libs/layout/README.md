# @chill-viking/layout

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

The type for the `header` object is `{ title$: Observable<string> }`,
and the type for the `footer` object is `{ copyRightHolder?: string }`.
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

The default for the `[data]` input of the component is

```typescript
{
  header: {
    title$: of('[data] not supplied');
  }
}
```

When no input is provided for `[data]`, the rendered title will be `[data] not supplied`.

### Final HTML

The above [component](#component) and [template](#template),
result in the following HTML rendered inside the `<cv-layout>` element of the template

```html
<div class="cv-layout">
  <header class="cv-layout-header">
    <h1>Custom header for My Title</h1>
  </header>
  <div class="cv-layout-container">
    <p>My Content</p>
  </div>
  <footer class="cv-layout-footer">
    <span>Copyright &copy; 2023 Chill Viking</span>
  </footer>
</div>
```

## Contributing

We welcome contributions to this package! If you have an idea for a fun feature, feel free to [open a pull request](https://github.com/chill-viking/ng-libs), [create an issue](https://github.com/chill-viking/ng-libs/issues/new/choose), or [start a discussion](https://github.com/orgs/chill-viking/discussions/categories/ideas).

## License

This package is licensed under the GNU General Public License. See the [LICENSE](./LICENSE) file for more details.
