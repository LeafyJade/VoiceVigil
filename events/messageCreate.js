module.exports = {
	name: 'messageCreate',
	execute(message) {
		let msg = message.content.toLowerCase();
		if(!message.author.bot) {
			if(msg.includes("bubbles")) {
				message.channel.send("Bubbles is a bad word, " + message.author.username + "!");
			}
			else {
					try {
						const { joinVoiceChannel } = require('@discordjs/voice')
						const { getVoiceConnection } = require('@discordjs/voice');
						const PREFIX = '*';
						const _CMD_HELP        = PREFIX + 'help';
						const _CMD_JOIN        = PREFIX + 'join';
						const _CMD_LEAVE       = PREFIX + 'leave';
						const _CMD_DEBUG       = PREFIX + 'debug';
						const _CMD_TEST        = PREFIX + 'hello';
						const _CMD_LANG        = PREFIX + 'lang';

						const guildMap = new Map();
						if (!('guild' in message) || !message.guild) return; // prevent private messages to bot
						const mapKey = message.guild.id;
						if (message.content.trim().toLowerCase() == _CMD_JOIN) {
							if (!message.member.voice.channel.id) {
								message.reply('Error: please join a voice channel first.')
							} else {
								//Nicki added const connection
								console.log("two")
								if (!guildMap.has(mapKey)) {
									const connection = joinVoiceChannel({
										channelId: message.member.voice.channel.id,
										guildId: message.guild.id,
										adapterCreator: message.guild.voiceAdapterCreator,
										selfDeaf: false,
									});
								}
								else
									message.reply('Already connected')
								console.log("three")
							}
							console.log("four")
							const connection = getVoiceConnection(message.member.voice.channel.guild.id);
							guildMap.set(mapKey, {
								'text_Channel': message.channel.id,
								'voice_Channel': message.member.voice.channel.id,
								'voice_Connection': connection,
								'selected_lang': 'en',
								'debug': false,
							});
							console.log("five")
							//nothing with connection.on is working -- deprecated
							// connection.on('speaking', async (user, speaking) => {
							// 	console.log("six")
							// 	if (speaking.bitfield == 0 || user.bot) {
							// 		console.log("seven")
							// 		return
							// 	}
							// 	console.log(`I'm listening to ${user.username}`)
							// 	// this creates a 16-bit signed PCM, stereo 48KHz stream
							// 	const audioStream = connection.receiver.createStream(user, { mode: 'pcm' })
							// 	audioStream.on('error',  (e) => { 
							// 		console.log('audioStream: ' + e)
							// 	});
							// 	let buffer = [];
							// 	audioStream.on('data', (data) => {
							// 		buffer.push(data)
							// 	})
							// 	audioStream.on('end', async () => {
							// 		buffer = Buffer.concat(buffer)
							// 		const duration = buffer.length / 48000 / 4;
							// 		console.log("duration: " + duration)
		
							// 		if (duration < 1.0 || duration > 19) { // 20 seconds max dur
							// 			console.log("TOO SHORT / TOO LONG; SKPPING")
							// 			return;
							// 		}
						
							// 		try {
							// 			try {
							// 				// stereo to mono channel
							// 				const data = new Int16Array(buffer)
							// 				const ndata = data.filter((el, idx) => idx % 2);
							// 				let new_buffer = Buffer.from(ndata);
							// 			} catch (e) {
							// 				console.log(e)
							// 				console.log('convert_audio: ' + e)
							// 				throw e;
							// 			}										
							// 			try {
							// 				const gspeech = require('@google-cloud/speech');
							// 				const gspeechclient = new gspeech.SpeechClient({
							// 				projectId: 'discordbot',
							// 				keyFilename: 'gspeech_key.json'
							// 				});
							// 				console.log('transcribe_gspeech')
							// 				const bytes = new_buffer.toString('base64');
							// 				const audio = {
							// 				  content: bytes,
							// 				};
							// 				const config = {
							// 				  encoding: 'LINEAR16',
							// 				  sampleRateHertz: 48000,
							// 				  languageCode: 'en-US',  // https://cloud.google.com/speech-to-text/docs/languages
							// 				};
							// 				const request = {
							// 				  audio: audio,
							// 				  config: config,
							// 				};
									  
							// 				const [response] = await gspeechclient.recognize(request);
							// 				const transcription = response.results
							// 				  .map(result => result.alternatives[0].transcript)
							// 				  .join('\n');
							// 				console.log(`gspeech: ${transcription}`);
							// 				let out = transcription;
									  
							// 			} catch (e) { console.log('transcribe_gspeech 368:' + e) }
																				
							// 			if (out != null)
							// 				process_commands_query(out, mapKey, user);
							// 		} catch (e) {
							// 			console.log('tmpraw rename: ' + e)
							// 		}
											
							// 	})
							// })
							// connection.on('disconnect', async(e) => {
							// 	if (e) console.log(e);
							// 	guildMap.delete(mapKey);
							// })
							message.reply('connected!')
					}
				}
					catch (e) {
						console.log('connect: ' + e)
						message.reply('Error: unable to join your voice channel.');
						throw e;
					}
			}
		}
	},
};