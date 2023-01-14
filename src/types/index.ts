import React from "react";

export type GenericProps<T extends {}> = {
  [K in keyof T]: T[K];
};

export type GenericComponent<T extends {}> = React.FC<GenericProps<T>>;

export type CustomComponent<
  ComponentProps extends {} = {},
  DefineGenericProps extends {} = {}
> = GenericComponent<ComponentProps & DefineGenericProps>;
