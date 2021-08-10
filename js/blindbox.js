var app = new Vue({
	el: '#blindbox',
	components: {
		'blindbox': httpVueLoader('blindbox.vue'),
		'blindmodal': httpVueLoader('blindModal.vue')
	}
})