#coding:utf-8
import Kernel

if __name__=='__main__':
    Kia=Kernel.Kernel()
    #Kia.learn("cn-test.aiml")
    #Kia.learn("bye.aiml")
    #Kia.learn("Common conversation.aiml")
    #Kia.learn("funny.aiml")
    Kia.learn("Kia.aiml")
    #Kia.learn("OrdinaryQuestion.aiml")
    #Kia.learn("personname.aiml")
    Kia.learn("nk.aiml")
    #Kia.learn("tools.aiml")
    #Kia.learn("tuling.aiml")
    while True:

        print('>>'+Kia.respond(input('问小开>>')))
        
