export type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType]: ObjectType[Key] extends object
    ? `${Key & string}.${NestedKeyOf<ObjectType[Key]>}`
    : Key & string
}[keyof ObjectType]
