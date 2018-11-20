// Copyright (c) 2018, Compiler Explorer Team
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright notice,
//       this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
// AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
// IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
// ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
// LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
// CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
// SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
// INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
// CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
// ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
// POSSIBILITY OF SUCH DAMAGE.
"use strict";

const
    utils = require('../utils'),
    fs = require('fs-extra'),
    denodeify = require('denodeify'),
    BaseTool = require('./base-tool');

class PaholeTool extends BaseTool {
    constructor(toolInfo, env) {
        super(toolInfo, env);

        this.stat = denodeify(fs.stat);
    }

    runTool(sourcefile, args, compilerExe, outputFilename, options, filters, asm, executableFilename) {
        if(!filters.binary)
        {
            return {
                id: this.tool.id,
                name: this.tool.name,
                code: 0,
                stdout: utils.parseOutput("Pahole requires a binary output")
            };
        }

        return this.stat(executableFilename).then((err, fd) => {
            if (fd) {
                return super.runTool(executableFilename, args);
            } else {
                return super.runTool(outputFilename, args);
            }
        });
    }
}

module.exports = PaholeTool;