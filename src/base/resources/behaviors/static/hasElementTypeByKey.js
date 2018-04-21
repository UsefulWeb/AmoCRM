export default typesKey => function hasElementType( value ) {
  const types = this[ typesKey ],
    compareKey = key => types[ key ] === value,
    type = Object.keys( types ).filter( compareKey )[ 0 ];

  return type.toLowerCase();
};
