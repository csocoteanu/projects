from Modules import BasePlugin
from utils import *

import shutil
import os

class LogCollector(BasePlugin.BasePlugin):
    def getName(self):
        return "Log Collector"

    def prepare(self):
        super(LogCollector, self).prepare()

        context        = self.getContext()
        archiveDirPath = context[Constants.kDestinationDir]
        logDirPath     = os.path.join(archiveDirPath, Constants.kLogs)

        os.mkdir(logDirPath)

    def run(self):
        print "Collecting selected logs..."

        context        = self.getContext()
        otherConfig    = self.getOtherConfig()
        archiveDirPath = context[Constants.kDestinationDir]
        logDirPath     = os.path.join(archiveDirPath, Constants.kLogs)

        logs = otherConfig[Constants.kLogPaths]
        for log in logs:
            print "Inflating " + log + "..."
            shutil.copy(log, logDirPath)