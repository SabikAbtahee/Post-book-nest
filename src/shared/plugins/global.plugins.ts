export function updateLastUpdateDate(schema, options) {
  schema.pre('updateOne', function () {
    this.set({ LastUpdateDate: new Date() });
  });
}
