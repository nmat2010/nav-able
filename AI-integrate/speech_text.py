import speech_recognition as sr
from enum import Enum 

class Language(Enum):
    ENGLISH = "en-US"
    CHINESE = "zh-TW"

class SpeechToText:
    def print_mic_device_index():
        for index, name in enumerate(sr.Microphone.list_microphone_names()):
            print("{1}, device_index={0}".format(index,name))
    def speech_to_text(device_index, language=Language.ENGLISH):
        r = sr.Recognizer() 
        with sr.Microphone(device_index = device_index) as source:
            print("Start Talking:")
            print("Say 'I'm done' to stop converting")
            stop = False

            
            while not stop:
                try:
                    audio = r.listen(source)
                    text = r.recognize_google(audio,language=language.value)
                    print("You said: {}".format(text))

                    if "done" in text: 
                        print("Stopping speech recognition...")
                        stop = True
                except:
                    print("Please try again.")

def check_mic_device_text():
    SpeechToText.print_mic_device_index()

def run_speech_to_text_english(device_index):
    SpeechToText.speech_to_text(device_index=device_index)

if __name__ == '__main__':
    # check_mic_device_text()
    run_speech_to_text_english(device_index=1)
