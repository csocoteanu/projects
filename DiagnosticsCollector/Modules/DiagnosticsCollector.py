from Modules import BasePlugin
from utils import *

import os
import os.path
import shutil

class DiagnosticsCollector(BasePlugin.BasePlugin):
    def getName(self):
        return "Diagnostics Collector"

    def prepare(self):
        super(DiagnosticsCollector, self).prepare()

        context = self.getContext()
        otherConfig = self.getOtherConfig()
        archiveDirPath = os.path.join(otherConfig[Constants.kArchive][Constants.kDestinationDir], otherConfig[Constants.kArchive][Constants.kName])

        if os.path.exists(archiveDirPath) and os.path.isdir(archiveDirPath):
            print "Removing existing: " + archiveDirPath
            shutil.rmtree(archiveDirPath)

        context[Constants.kDestinationDir] = archiveDirPath
        os.mkdir(archiveDirPath)

    def run(self):
        super(DiagnosticsCollector, self).run()
        self.createArchive()
        self.copyArchiveRemote()

    def cleanup(self):
        super(DiagnosticsCollector, self).cleanup()

        context = self.getContext()
        archiveDirPath = context[Constants.kDestinationDir]

        if os.path.exists(archiveDirPath) and os.path.isdir(archiveDirPath):
            print "Removing existing directory: " + archiveDirPath
            shutil.rmtree(archiveDirPath)

    def createArchive(self):
        print "Creating archive..."

        context = self.getContext()
        archiveDirPath = context[Constants.kDestinationDir]
        otherConfig = self.getOtherConfig()

        shutil.make_archive(archiveDirPath, otherConfig[Constants.kArchive][Constants.kType], archiveDirPath)

    def copyArchiveRemote(self):
        config = self.getOtherConfig()
        context = self.getContext()

        scpConfig = config[Constants.kRemoteCopy]
        if (scpConfig[Constants.kEnable] == False):
            print "Skipping copying archive to remote host..."
            return

        print "Copying archive to remote host..."

        archiveFullPath = context[Constants.kDestinationDir] + "." + config[Constants.kArchive][Constants.kType]
        scpArgs = []
        scpArgs.append(archiveFullPath)
        scpArgs.append(scpConfig[Constants.kUser] + '@' + scpConfig[Constants.kHostname] + ":" + scpConfig[Constants.kPath])
        spawnProcess(Constants.kScpExec, scpArgs)

        print "Removing archive..."
        os.remove(archiveFullPath)