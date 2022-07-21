export function updateLastUpdateDate(schema, options) {
	schema.pre('updateOne', function () {
		this.set({ LastUpdateDate: new Date() });
	});
}

export function onCreationGenericPropertyInsertion(schema, options) {
	schema.pre('validate', function () {
        console.log(this);
		this.set({
			LastUpdateDate: new Date(),
			CreateDate: new Date()
		});
	});

    schema.post('validate',function(){
        console.log(this);
    });

    schema.pre('save',function(){
        console.log(this);
    });
    schema.post('save',function(){
        console.log(this);
    });

}
