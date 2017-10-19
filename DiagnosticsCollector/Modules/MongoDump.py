from Modules import BasePlugin
from utils import *

import os
import os.path

class MongoDump(BasePlugin.BasePlugin):
    def getName(self):
        return "Mongo Dump"

    def run(self):
        super(MongoDump, self).run()

        print "Dumping database information..."
        self.dumpMongoDatabase()

    def dumpMongoDatabase(self):
        # assemble MongoDump arguments
        mongoDumpArgs = self.getMongoDbOptions()

        # spawn mongodump process
        spawnProcess(Constants.kMongoDumpExec, mongoDumpArgs)

    def getMongoDbOptions(self):
        config = self.getOtherConfig()
        context = self.getContext()
        mongoDumpArgs = []

        # user + password
        if (config[Constants.kUser]) and (config[Constants.kPassword]):
            mongoDumpArgs.append("-u " + config[Constants.kUser])
            mongoDumpArgs.append("-p " + config[Constants.kPassword])

        # output of the dump location
        archiveDirPath   = context[Constants.kDestinationDir]
        mongoDumpDirPath = os.path.join(archiveDirPath, Constants.kMongoDump)
        mongoDumpArgs.append("-o " + mongoDumpDirPath)

        return mongoDumpArgs