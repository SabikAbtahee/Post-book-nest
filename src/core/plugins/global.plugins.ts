export function updateLastUpdateDate(schema, options) {
	schema.pre('updateOne', function () {
		this.set({ LastUpdateDate: new Date() });
	});
}

export function onCreationGenericPropertyInsertion(schema, options) {
	schema.pre('validate', function () {
		this.set({
			LastUpdateDate: new Date(),
			CreateDate: new Date()
		});
	});

	schema.post('validate', function () {});
	schema.pre('save', function () {});
	schema.post('save', function () {});
}
