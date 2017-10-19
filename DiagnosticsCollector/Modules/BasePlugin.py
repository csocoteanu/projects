import plugins
from utils import *

class BasePlugin(object):
    def __init__(self, config, context={}):
        self.enabled = False
        self.childModules = None
        self.otherConfig = None
        self.context = context

        self.loadConfig(config)

    def isEnabled(self):
        return self.enabled

    def getName(self):
        return None

    def getChildModules(self):
        return self.childModules

    def getOtherConfig(self):
        return self.otherConfig

    def getContext(self):
        return self.context

    def prepare(self):
        pass

    def run(self):
        print 'Executing ' + self.getName() + '...'

        for module in self.getChildModules():
            module.dryRun()

    def cleanup(self):
        print 'Cleaning up ' + self.getName() + '...'

    def dryRun(self):
        try:
            if self.isEnabled():
                self.prepare()
                self.run()
                self.cleanup()
            else:
                print 'Module ' + self.getName() + ' is disabled. Skipping run...'
        except Exception as e:
            print "Unexpected error: ", e
            self.cleanup()

    def loadConfig(self, config):
        print 'Configuring ' + self.getName() + '...'

        self.enabled = config[Constants.kEnable]
        self.otherConfig = config[Constants.kOtherConfig]

        self.loadChildModulesConfig(config)

    def loadChildModulesConfig(self, config):
        self.childModules = []
        childTypes = config[Constants.kModules].keys()
        for childType in childTypes:
            childModule = plugins.Loader.createPlugin(childType, config[Constants.kModules][childType])
            self.childModules.append(childModule)